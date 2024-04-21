import xml2js from 'xml2js';
import {
    BinResponse,
    HashResponse, ITemp
} from "./types";
import {BinSanalPos, TpIslemOdemeWd, TpIslemOdemeWdResponse, TpWmdUcd, TpWmdUcdResponse} from "./serviceturkpos";
import {ServiceTurkposClientImpl} from "./serviceturkpos/client";
import {createClientAsync} from "soap";


export class ParamposSoap implements ServiceTurkposClientImpl{
    private readonly url : string;
    constructor(url : string) {
        this.url = url
    }

    async BIN_SanalPosAsyncImpl(queryOptions:  BinSanalPos) : Promise<[result: ITemp , rawResponse: any, soapHeader: any, rawRequest: any]>{

        const body = `<?xml version="1.0" encoding="utf-8"?> <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body>
        <BIN_SanalPos xmlns="https://turkpos.com.tr/">
        <G>
            <CLIENT_CODE>${queryOptions.G?.CLIENT_CODE}</CLIENT_CODE>
            <CLIENT_USERNAME>${queryOptions.G?.CLIENT_USERNAME}</CLIENT_USERNAME>
            <CLIENT_PASSWORD>${queryOptions.G?.CLIENT_CODE}</CLIENT_PASSWORD>
        </G>
        <BIN>${queryOptions.BIN}</BIN>
        </BIN_SanalPos>
        </soap:Body>
    </soap:Envelope>`

        const options: Options = createRequestOptions(body);
        const response = await  getResponse<ITemp, BinResponse>(this.url, options , (result) => {
            return {
                BIN: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['BIN'],
                SanalPOS_ID: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['SanalPOS_ID'],
                Kart_Banka: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['Kart_Banka'],
                DKK: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['DKK'],
                Kart_Tip: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['Kart_Tip'],
                Kart_Org: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['Kart_Org'],
                Banka_Kodu: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['Banka_Kodu'],
                Kart_Ticari: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['Kart_Ticari'],
                Kart_Marka: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['Kart_Marka'],
            }
        })
        let rawResponse = undefined
        let soapHeader = undefined
        let rawRequest = undefined
        return [response, rawResponse, soapHeader, rawRequest]
    }

    async TP_WMD_UCDAsyncImpl( paymentOptions: TpWmdUcd) : Promise<[result: TpWmdUcdResponse, rawResponse: any, soapHeader: any, rawRequest: any]>  {
        // we need to create hash first
        // create hash like CLIENT_CODE & GUID & Taksit &
        //         Islem_Tutar & Toplam_Tutar & Siparis_ID
        let clientCode = paymentOptions.G?.CLIENT_CODE ? paymentOptions.G.CLIENT_CODE : ""
        const securityString = clientCode + paymentOptions.GUID + paymentOptions.Taksit +
            paymentOptions.Islem_Tutar + paymentOptions.Toplam_Tutar + paymentOptions.Siparis_ID;
        const {hash} = await createHash(this.url, securityString)
        console.log(this.url + "?wsdl")
        const soapClient = await createClientAsync(this.url + "?wsdl");
        paymentOptions.Islem_Hash = hash
        return await soapClient.TP_WMD_UCDAsync(paymentOptions);
    }

    async TP_Islem_Odeme_WDAsyncImpl (tpIslemOdemeWd: TpIslemOdemeWd) : Promise<[result: TpIslemOdemeWdResponse, rawResponse: any, soapHeader: any, rawRequest: any]> {
        // creating hash
        // GUID + Islem_Tutar + Islem_Toplam + Siparis_ID +
        let clientCode = tpIslemOdemeWd.G?.CLIENT_CODE ? tpIslemOdemeWd.G.CLIENT_CODE : ""
        const securityString = clientCode + tpIslemOdemeWd.GUID +
            tpIslemOdemeWd.Islem_Tutar + tpIslemOdemeWd.Toplam_Tutar + tpIslemOdemeWd.Siparis_ID +
            tpIslemOdemeWd.Basarili_URL + tpIslemOdemeWd.Hata_URL;
        const {hash} = await createHash(this.url, securityString);
        tpIslemOdemeWd.Islem_Hash= hash;
        const soapClient = await createClientAsync(this.url+ "?wsdl");
        return await soapClient.TP_Islem_Odeme_WDAsync(tpIslemOdemeWd);
    }
}

function createRequestOptions(body: string): Options {
    return {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'text/xml',
        },
    };
}

type Options = {
    method : string
    body : string
    headers : {
        [key: string]: string;
    }
}

function handleError(response: Response) {
    return new Promise<string>((resolve, reject) => {
        response.text().then(res => {
            const parser = new xml2js.Parser({explicitArray: false, trim: true})
            parser.parseString(res, (error, result) => {
                if (error) {
                    return reject(error.message)
                }
                return resolve(result['soap:Envelope']['soap:Body']["soap:Fault"]["soap:Reason"]["soap:Text"]["_"])
            })
        }).catch((e) => reject(e))
    })
}

export function createHash(url: string, securityString: string) :Promise<{hash : string}> {

    const body = `<?xml version="1.0" encoding="utf-8"?><x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tur="https://turkpos.com.tr/">
        <x:Header/>
        <x:Body>
           <tur:SHA2B64>
           <tur:Data>${securityString}</tur:Data>
        </tur:SHA2B64>
        </x:Body>
    </x:Envelope>`;
    const options: Options = createRequestOptions(body);

    return getResponse<{hash : string}, HashResponse>(url, options, (result)=>{
        return {
            hash : result['soap:Envelope']['soap:Body']['SHA2B64Response']['SHA2B64Result']
        }
    })
}



/**
 * Returns a Promise that resolves with a result from an HTTP response after parsing an XML response.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Options} options - The options to be used for the HTTP request.
 * @template T - Response
 * @template K - Param Response
 * @param {(result: T) => K} cb - The callback function to process the parsed XML response.
 * @returns {Promise<K, T>} - A Promise that resolves with the processed result or rejects with an error. K here is Return Type of the function T is return type from parampos
 */
async function getResponse<K, T>(url : string, options :  Options,  cb : (result : T) => K): Promise<K>{

    return new Promise<K>((resolve, reject) => {
        fetch(url, options).then(async response => {
            const parser = new xml2js.Parser({explicitArray: false, trim: true})

            if (response.status !== 200) {
                const reason = await handleError(response).then(reason => reason).catch(e => e.message)
                reject(reason)
            }
            response.text().then((xmlResponse) => {
                parser.parseString(xmlResponse, (err, result) => {
                    if(err){
                        reject(err)
                    }
                    try {
                        const resultFin = cb(result)
                        return resolve(resultFin)
                    } catch (error) {
                        return reject(error)
                    }
                })
            })
        }).catch(error => reject(error))
    })
}
