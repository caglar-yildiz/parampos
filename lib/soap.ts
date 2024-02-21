import xml2js  from 'xml2js';
import {
    BinQueryParams,
    BinResponse,
    HashResponse,
    ParamPaymentResponse,
    MakePaymentRequestType, TPWMDUCDResult, ITemp
} from "./types";

function createRequestOptions(body: string): Options {
    return {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'text/xml',
        },
    };
}

type Options = {
    method : string
    body : string
    headers : {
        [key: string]: string;
    }
}

function handleError(response: Response) {
    return new Promise<string>((resolve, reject) => {
        response.text().then(res => {
            const parser = new xml2js.Parser({explicitArray: false, trim: true})
            parser.parseString(res, (error, result) => {
                if (error) {
                    return reject(error.message)
                }
                return resolve(result['soap:Envelope']['soap:Body']["soap:Fault"]["soap:Reason"]["soap:Text"]["_"])
            })
        }).catch((e) => reject(e))
    })
}

export function createHash(url: string, securityString: string) :Promise<{hash : string}> {

    const body = `<?xml version="1.0" encoding="utf-8"?><x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tur="https://turkpos.com.tr/">
        <x:Header/>
        <x:Body>
           <tur:SHA2B64>
           <tur:Data>${securityString}</tur:Data>
        </tur:SHA2B64>
        </x:Body>
    </x:Envelope>`;
    const options: Options = createRequestOptions(body);

    return getResponse<{hash : string}, HashResponse>(url, options, (result)=>{
        return {
            hash : result['soap:Envelope']['soap:Body']['SHA2B64Response']['SHA2B64Result']
        }
    })
}


export async function makePayment(url: string, paymentOptions: MakePaymentRequestType)  {
    // we need to create hash first
    // create hash like CLIENT_CODE & GUID & Taksit &
    //         Islem_Tutar & Toplam_Tutar & Siparis_ID
    const securityString = paymentOptions.CLIENT_CODE + paymentOptions.GUID + paymentOptions.installment +
        paymentOptions.price + paymentOptions.total + paymentOptions.orderId
    const {hash} = await createHash(url, securityString)


    const body = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body>
        <TP_WMD_UCD xmlns="https://turkpos.com.tr/">
        <G>
            <CLIENT_CODE>${paymentOptions.CLIENT_CODE}</CLIENT_CODE>
            <CLIENT_USERNAME>${paymentOptions.CLIENT_USERNAME}</CLIENT_USERNAME>
            <CLIENT_PASSWORD>${paymentOptions.CLIENT_PASSWORD}</CLIENT_PASSWORD>
        </G>
            <GUID>${paymentOptions.GUID}</GUID>
            <KK_Sahibi>${paymentOptions.cardName}</KK_Sahibi>
            <KK_No>${paymentOptions.cardNumber}</KK_No>
            <KK_SK_Ay>${paymentOptions.cardExpMonth}</KK_SK_Ay>
            <KK_SK_Yil>${paymentOptions.cardExpYear}</KK_SK_Yil>
            <KK_CVC>${paymentOptions.cardCvv}</KK_CVC>
            <KK_Sahibi_GSM>${paymentOptions.cardHolderPhone}</KK_Sahibi_GSM>
            <Hata_URL>${paymentOptions.failUrl}</Hata_URL>
            <Basarili_URL>${paymentOptions.successUrl}</Basarili_URL>
            <Siparis_ID>${paymentOptions.orderId}</Siparis_ID>
            <Siparis_Aciklama>${paymentOptions.description}</Siparis_Aciklama>
            <Taksit>${paymentOptions.installment}</Taksit>
            <Islem_Tutar>${paymentOptions.price}</Islem_Tutar>
            <Toplam_Tutar>${paymentOptions.total}</Toplam_Tutar>
            <Islem_Hash>${hash}</Islem_Hash>
            <Islem_Guvenlik_Tip>${paymentOptions.securityType}</Islem_Guvenlik_Tip>
            <IPAdr>${paymentOptions.ipAddress}</IPAdr>
            <Ref_URL>${paymentOptions.successUrl}</Ref_URL>
        <Data1>a</Data1>
        <Data2>a</Data2>
        <Data3>a</Data3>
        <Data4>a</Data4>
        <Data5>a</Data5>
        </TP_WMD_UCD>
        </soap:Body>
        </soap:Envelope>`;
    const options: Options = createRequestOptions(body);

    return getResponse< TPWMDUCDResult & {success : boolean, code : string}, ParamPaymentResponse >(url, options, (result)=> {
        const response : TPWMDUCDResult = result["soap:Envelope"]["soap:Body"].TP_WMD_UCDResponse.TP_WMD_UCDResult
        return {
            success : response.Sonuc  != '0',
            code : response.Sonuc,
            Islem_ID: response.Islem_ID,
            UCD_HTML: response.UCD_HTML,
            UCD_MD : response.UCD_MD,
            Sonuc: response.Sonuc,
            Sonuc_Str: response.Sonuc_Str,
            Bank_Trans_ID : response.Bank_Trans_ID,
            Bank_AuthCode : response.Bank_AuthCode,
            Bank_HostMsg: response.Bank_HostMsg,
            Banka_Sonuc_Kod: response.Banka_Sonuc_Kod,
            Bank_Extra: response.Bank_Extra,
            Siparis_ID: response.Siparis_ID,
            Islem_GUID : response.Islem_GUID
        }
    })
}

export async function queryBin(url : string, queryOptions:  BinQueryParams){

    const body = `<?xml version="1.0" encoding="utf-8"?> <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body>
        <BIN_SanalPos xmlns="https://turkpos.com.tr/">
        <G>
            <CLIENT_CODE>${queryOptions.CLIENT_CODE}</CLIENT_CODE>
            <CLIENT_USERNAME>${queryOptions.CLIENT_USERNAME}</CLIENT_USERNAME>
            <CLIENT_PASSWORD>${queryOptions.CLIENT_PASSWORD}</CLIENT_PASSWORD>
        </G>
        <BIN>${queryOptions.BIN}</BIN>
        </BIN_SanalPos>
        </soap:Body>
    </soap:Envelope>`

    const options: Options = createRequestOptions(body);
    return getResponse<ITemp & {success : boolean, code : string}, BinResponse>(url, options , (result) => {
        return {
            success: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['Sonuc'] != '0',
            code: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['Sonuc_Str'],
            BIN: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['BIN'],
            SanalPOS_ID: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['SanalPOS_ID'],
            Kart_Banka: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['Kart_Banka'],
            DKK: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['DKK'],
            Kart_Tip: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['Kart_Tip'],
            Kart_Org: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['Kart_Org'],
            Banka_Kodu: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['Banka_Kodu'],
            Kart_Ticari: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['Kart_Ticari'],
            Kart_Marka: result['soap:Envelope']['soap:Body']['BIN_SanalPosResponse']['BIN_SanalPosResult']['DT_Bilgi']['diffgr:diffgram']['NewDataSet']['Temp']['Kart_Marka'],
        }
    })
}


/**
 * Returns a Promise that resolves with a result from an HTTP response after parsing an XML response.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Options} options - The options to be used for the HTTP request.
 * @template T - Response
 * @template K - Param Response
 * @param {(result: T) => K} cb - The callback function to process the parsed XML response.
 * @returns {Promise<K, T>} - A Promise that resolves with the processed result or rejects with an error. K here is Return Type of the function T is return type from parampos
 */
async function getResponse<K, T>(url : string, options :  Options,  cb : (result : T) => K): Promise<K>{

    return new Promise<K>((resolve, reject) => {
        fetch(url, options).then(async response => {
            const parser = new xml2js.Parser({explicitArray: false, trim: true})

            if (response.status !== 200) {
                const reason = await handleError(response).then(reason => reason).catch(e => e.message)
                reject(reason)
            }
            response.text().then((xmlResponse) => {
                parser.parseString(xmlResponse, (err, result) => {
                    try {
                        const resultFin = cb(result)
                        return resolve(resultFin)
                    } catch (error) {
                        return reject(error)
                    }
                })
            })
        }).catch(error => reject(error))
    })
}
