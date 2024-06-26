import {createClientAsync, TpWmdUcd} from "./serviceturkpos";
import {ParamposSoap} from "./soap";
import {ServiceTurkposClient} from "./serviceturkpos/client";

const urls = {
    production: 'https://dmzws.ew.com.tr/turkpos.ws/service_turkpos_prod.asmx',
    test: 'https://test-dmz.param.com.tr:4443/turkpos.ws/service_turkpos_test.asmx'
}

export class Parampos {
    private readonly G ;
    private readonly MODE;
    private soapClient : ServiceTurkposClient | undefined;
    private paramposSoap : ParamposSoap ;
    constructor({
                    CLIENT_CODE,
                    CLIENT_USERNAME,
                    CLIENT_PASSWORD,
                    MODE,
                    options
                } : {
        CLIENT_CODE : string
        CLIENT_USERNAME : string
        CLIENT_PASSWORD : string
        MODE : "test" | "production"
        options? : { url : string }
    }) {
        this.G = {
            CLIENT_CODE ,
            CLIENT_USERNAME ,
            CLIENT_PASSWORD ,
        }
        this.MODE = MODE;
        urls[MODE] = options ? options.url : urls[MODE]
        this.paramposSoap = new ParamposSoap(urls[MODE])
    }

    async getClient() : Promise<ServiceTurkposClient >{
        if(this.soapClient){
            return this.soapClient
        }
        this.soapClient = await createClientAsync(urls[this.MODE] + "?wsdl")
        if(!this.soapClient) throw new Error("Error");
        this.soapClient.BIN_SanalPosAsyncImpl = (input) => {
            return this.paramposSoap.BIN_SanalPosAsyncImpl({...input, G : this.G})
        }
        this.soapClient.TP_WMD_UCDAsyncImpl = (input ) => {
            return this.paramposSoap.TP_WMD_UCDAsyncImpl({...input, G : this.G})
        }
        this.soapClient.TP_Islem_Odeme_WDAsyncImpl = (input ) => {
            return this.paramposSoap.TP_Islem_Odeme_WDAsyncImpl({...input, G : this.G})
        }
        return new Proxy<ServiceTurkposClient>(this.soapClient,
            {
                get: (target, propKey :string) => {
                    const originalMethod = target[propKey];
                    if (typeof originalMethod === 'function') {
                        return (...args: any[]) => {
                            if (!args[0].G)
                            {
                                args[0] = {...args[0], G: this.G};
                            }
                            return originalMethod.apply(target, args);
                        }
                    }
                    return originalMethod;
                }
            })
    }
}

