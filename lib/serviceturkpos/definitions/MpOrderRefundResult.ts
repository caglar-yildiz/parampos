import { List3 } from "./List3";

/**
 * MP_OrderRefundResult
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface MpOrderRefundResult {
    /** s:int */
    ResultCode?: string;
    /** s:string */
    ResultDescription?: string;
    /** List */
    List?: List3;
}
