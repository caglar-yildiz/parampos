
export interface BinResponse {
    'soap:Envelope' : IEnvelope
}
interface IEnvelope {
    'soap:Body': IBody;
}

interface IBody {
    'BIN_SanalPosResponse': IBinSanalPosResponse;
}

interface IBinSanalPosResponse {
    'BIN_SanalPosResult': IBinSanalPosResult;
}

export interface IBinSanalPosResult {
    'DT_Bilgi': IDtBilgi;
    'Sonuc': string;
    'Sonuc_Str': string;
}

interface IDtBilgi {
    'diffgr:diffgram': IDiffgram;
}

interface IDiffgram {
    'NewDataSet': INewDataSet;
}

interface INewDataSet {
    'Temp': ITemp;
}

export interface ITemp {
    'BIN': string;
    'SanalPOS_ID': string;
    'Kart_Banka': string;
    'DKK': string;
    'Kart_Tip': string;
    'Kart_Org': string;
    'Banka_Kodu': string;
    'Kart_Ticari': string;
    'Kart_Marka': string;
}