export type DefaultParams = {
    CLIENT_CODE: string
    CLIENT_USERNAME: string
    CLIENT_PASSWORD: string
    GUID: string
}

export type MakePaymentRequestType = DefaultParams & {
    cardName: string
    cardNumber: string
    cardExpMonth: string
    cardExpYear: string
    cardCvv: string
    cardHolderPhone: string
    failUrl: string
    successUrl: string
    orderId: string
    installment: string
    description: string
    total: string
    price: string
    securityType: string
    ipAddress: string
}

export type BinQueryParams = DefaultParams & {
    BIN : string
}