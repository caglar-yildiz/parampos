import {createUUID} from "./makePayment.test";
import * as console from "console";
import {Parampos} from "../lib/parampos"
import {ParamposSoap} from "../lib/soap";

describe('queryBin function', () => {

    const queryParams = {
        CLIENT_CODE: "10738",
        CLIENT_USERNAME: "Test",
        CLIENT_PASSWORD: "Test",
        GUID: createUUID(),
        BIN : "6060432073705009"
    }


    it('should properly return BIN of the card', async () => {
        const url = "https://test-dmz.param.com.tr/turkpos.ws/service_turkpos_test.asmx"
        const soap = new ParamposSoap(url);
        const res = await soap.BIN_SanalPosAsyncImpl( queryParams);
        console.log(res)
    })

    it('should properly create security string and hash', async () => {
        const soap = new Parampos(
            {
                CLIENT_CODE: "10738",
                CLIENT_USERNAME: "Test",
                CLIENT_PASSWORD: "Test",
                MODE : "test"
            }
        );
        const client = await soap.getClient()

        const res = await client.BIN_SanalPosAsync({BIN : "6060432073705009"});

        console.log(res)
    })

})

describe("queryBin function using client",  ()=> {

    it('should properly create security string and hash', async () => {
        const soap = new Parampos(
            {
                CLIENT_CODE: "10738",
                CLIENT_USERNAME: "Test",
                CLIENT_PASSWORD: "Test",
                MODE : "test"
            }
        );
        const client = await soap.getClient()

        const res = await client.BIN_SanalPosAsync({BIN : "6060432073705009"});

        expect(res[0].BIN_SanalPosResult?.Sonuc).toBe("1")
    })
})


