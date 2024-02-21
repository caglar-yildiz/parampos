export interface TPModalPaymentResponseType {
    "soap:Envelope": Envelope
}

interface Envelope {
    'soap:Body': Body;
}

interface Body {
    'TP_Modal_PaymentResponse': TPModalPaymentResponse;
}

interface TPModalPaymentResponse {
    "TP_Modal_PaymentResult": TPModal_PaymentResult;
}

interface TPModal_PaymentResult {
    'ResultCode': string;
    'ResultDescription': string;
    'URL': string;
}