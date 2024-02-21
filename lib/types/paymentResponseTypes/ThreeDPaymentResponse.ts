export interface ThreeDPaymentResponse {
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

interface TPWMDUCDResult {
    'Islem_ID': string;
    'Islem_GUID': string;
    'UCD_HTML': string;
    'UCD_MD': string;
    'Sonuc': string;
    'Sonuc_Str': string;
    'Banka_Sonuc_Kod': string;
    'Siparis_ID': string;
}

