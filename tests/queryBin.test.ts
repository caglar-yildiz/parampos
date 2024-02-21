import {queryBin} from "../lib/soap";
import {createUUID} from "./makePayment.test";

describe('queryBin function', () => {
    const url = 'some url';
    const queryParams = {
        CLIENT_CODE: "10738",
        CLIENT_USERNAME: "Test",
        CLIENT_PASSWORD: "Test",
        GUID: createUUID(),
        BIN : "6060432073705009"
    }


    it('should properly create security string and hash', async () => {
        const url = "https://test-dmz.param.com.tr/turkpos.ws/service_turkpos_test.asmx"
        const res = await queryBin(url, queryParams)
        console.log(res)
    })

})