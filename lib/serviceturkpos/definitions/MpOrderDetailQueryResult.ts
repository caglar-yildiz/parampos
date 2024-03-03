import { Data7 } from "./Data7";

/**
 * MP_OrderDetailQueryResult
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface MpOrderDetailQueryResult {
    /** s:int */
    ResultCode?: string;
    /** s:string */
    ResultDescription?: string;
    /** Data */
    Data?: Data7;
}
