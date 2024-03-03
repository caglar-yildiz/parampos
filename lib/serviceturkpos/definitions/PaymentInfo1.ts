import { G } from "./G";

/**
 * Payment_Info
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface PaymentInfo1 {
    /** G */
    G?: G;
    /** s:string */
    GUID?: string;
    /** s:string */
    Batch_ID?: string;
}
