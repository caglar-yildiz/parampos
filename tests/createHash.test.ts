import {createHash} from "../lib/soap";

test('createHash', async () => {
    const url = 'https://test-dmz.param.com.tr/turkpos.ws/service_turkpos_test.asmx';
    const security = '107380c13d407-873b-403b-9c09-a5766840d98c1100.00100.00TTP_WMD_UCD3D0111';
    let result
    try {
        result = await createHash(url, security);
        expect(result.hash).toBe("3JA0eHXjU+Eb0SbDmhF3QM8cB2M=");
    }catch (e){
        expect(e).toContain("Server was unable")
    }
})