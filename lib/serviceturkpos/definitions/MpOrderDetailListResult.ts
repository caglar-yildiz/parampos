import { Data10 } from "./Data10";

/**
 * MP_OrderDetailListResult
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface MpOrderDetailListResult {
    /** s:int */
    ResultCode?: string;
    /** s:string */
    ResultDescription?: string;
    /** Data */
    Data?: Data10;
}
