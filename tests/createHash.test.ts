import {createHash} from "../lib/soap";
import {Parampos} from "../lib/parampos";

test('createHash', async () => {
    const soap = new Parampos(
        {
            CLIENT_CODE: "10738",
            CLIENT_USERNAME: "Test",
            CLIENT_PASSWORD: "Test",
            MODE : "test"
        }
    )
    const client = await soap.getClient()
    const security = '107380c13d407-873b-403b-9c09-a5766840d98c1100.00100.00TTP_WMD_UCD3D0111';
    let result
    try {
        //result = await createHash(url, security);
        result = await client.SHA2B64Async({Data : security})
        expect(result[0].SHA2B64Result).toBe("3JA0eHXjU+Eb0SbDmhF3QM8cB2M=");
    }catch (e){
        expect(e).toContain("Server was unable")
    }
})