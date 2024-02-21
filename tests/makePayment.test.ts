import {makePayment} from '../lib/soap';
import {  MakePaymentRequestType } from  "../lib/types"



export function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
describe('makePayment function', () => {
  const url = 'some url';

  const paymentOptions: MakePaymentRequestType = {
    CLIENT_CODE: '10738',
    CLIENT_USERNAME: 'Test',
    CLIENT_PASSWORD: 'Test',
    GUID: createUUID(),
    cardName: 'test',
    cardNumber: '4022774022774026',
    cardExpMonth: '12',
    cardExpYear: "2026",
    cardCvv: "000",
    cardHolderPhone: '5551231212',
    failUrl: 'https://dev.param.com.tr/tr',
    successUrl: 'https://dev.param.com.tr/tr',
    orderId: '1',
    installment: '1',
    description: 'some-description',
    total: '100.00',
    price: '100.00',
    securityType: 'NS',
    ipAddress: 'some-ip-address'
  }

  it('should properly create security string and hash', async () => {
    const url = "https://test-dmz.param.com.tr/turkpos.ws/service_turkpos_test.asmx"
    const res = await makePayment(url, paymentOptions)
    console.log(res)
  })

})