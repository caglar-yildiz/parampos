const urls = {
    prodURL: 'https://dmzws.ew.com.tr/turkpos.ws/service_turkpos_prod.asmx',
    testURL: 'https://test-dmz.param.com.tr:4443/turkpos.ws/service_turkpos_test.asmx'
}

class Parampos {
    private GUID;
    private CLIENT_CODE;
    private CLIENT_USERNAME;
    private CLIENT_PASSWORD;
    private MODE
    constructor({
                    GUID,
                    CLIENT_CODE,
                    CLIENT_USERNAME,
                    CLIENT_PASSWORD,
                    MODE
                } : {
        GUID : string
        CLIENT_CODE : string
        CLIENT_USERNAME : string
        CLIENT_PASSWORD : string
        MODE : "prod" | "test"
    }) {
        this.GUID = GUID;
        this.CLIENT_CODE = CLIENT_CODE;
        this.CLIENT_USERNAME = CLIENT_USERNAME;
        this.CLIENT_PASSWORD = CLIENT_PASSWORD;
        this.MODE = MODE;
    }

    makeSecurePayment(){

    }

}