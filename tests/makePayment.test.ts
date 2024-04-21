import {Parampos} from "../lib/parampos";
import {TpWmdUcd} from "../lib/serviceturkpos";

export function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
describe('makePayment function', () => {

  const paymentOptions: TpWmdUcd = {
    G : {
      CLIENT_CODE: '10738',
      CLIENT_USERNAME: 'Test',
      CLIENT_PASSWORD: 'Test',
    },
    GUID: createUUID(),
    KK_Sahibi: 'test',
    KK_No: '4022774022774026',
    KK_SK_Ay: '12',
    KK_SK_Yil: "2026",
    KK_CVC: "000",
    KK_Sahibi_GSM: '5551231212',
    Hata_URL: 'https://dev.param.com.tr/tr',
    Basarili_URL: 'https://dev.param.com.tr/tr',
    Siparis_ID: '1',
    Taksit: '1',
    Siparis_Aciklama: 'some-description',
    Toplam_Tutar: '100.00',
    Islem_Tutar: '100.00',
    Islem_Guvenlik_Tip: 'NS',
    IPAdr: 'some-ip-address'
  }


  it('should properly create security string and hash', async () => {
    const param = new Parampos({
      CLIENT_CODE: '10738',
      CLIENT_USERNAME: 'Test',
      CLIENT_PASSWORD: 'Test',
      MODE : "test",
    })
    const client = await param.getClient()
    const [result] = await client.TP_WMD_UCDAsyncImpl(paymentOptions)
    expect(result.TP_WMD_UCDResult?.Sonuc != null)
    console.log(result)
  })

})
