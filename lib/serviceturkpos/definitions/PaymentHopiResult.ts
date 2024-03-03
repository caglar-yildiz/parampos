import { Data1 } from "./Data1";

/**
 * Payment_HopiResult
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface PaymentHopiResult {
    /** s:int */
    ResultCode?: string;
    /** s:string */
    ResultDescription?: string;
    /** Data */
    Data?: Data1;
}
