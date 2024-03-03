import { Data3 } from "./Data3";

/**
 * MP_OrderDetailAddResult
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface MpOrderDetailAddResult {
    /** s:int */
    ResultCode?: string;
    /** s:string */
    ResultDescription?: string;
    /** Data */
    Data?: Data3;
}
