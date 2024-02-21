
export interface HashResponse {
    "soap:Envelope": IEnvelope
}
interface IEnvelope {
    'soap:Body': IBody;
}

interface IBody {
    'SHA2B64Response': ISha2B64;
}

interface ISha2B64 {
    "SHA2B64Result": string;
}