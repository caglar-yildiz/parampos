import { ListInfo1 } from "./ListInfo1";

/**
 * TP_Multiple_Payment_StatusResult
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface TpMultiplePaymentStatusResult {
    /** s:int */
    Result_Code?: string;
    /** s:string */
    Result_Message?: string;
    /** s:string */
    Batch_ID?: string;
    /** List_Info */
    List_Info?: ListInfo1;
}
