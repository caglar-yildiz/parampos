export interface ParamPaymentResponse {
    "soap:Envelope": Envelope
}

interface Envelope {
    'soap:Body': Body;
}

interface Body {
    'TP_WMD_UCDResponse': TPWMDUCDResponse;
}

interface TPWMDUCDResponse {
    "TP_WMD_UCDResult": TPWMDUCDResult;
}

export interface TPWMDUCDResult {
    'Islem_ID': string;
    'UCD_HTML': string;
    'UCD_MD'?: string;
    'Sonuc': string;
    'Sonuc_Str': string;
    'Bank_Trans_ID'?: string;
    'Bank_AuthCode'?: string;
    'Bank_HostMsg': string;
    'Banka_Sonuc_Kod': string;
    'Bank_Extra': string;
    'Siparis_ID': string;
    'Islem_GUID'?: string;
}