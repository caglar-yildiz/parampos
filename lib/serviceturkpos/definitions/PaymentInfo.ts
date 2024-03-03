import { G } from "./G";
import { ListInfo } from "./ListInfo";
import { FileInfo } from "./FileInfo";

/**
 * Payment_Info
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface PaymentInfo {
    /** G */
    G?: G;
    /** s:string */
    GUID?: string;
    /** s:string */
    Batch_ID?: string;
    /** s:string */
    Webhook_URL?: string;
    /** List_Info */
    List_Info?: ListInfo;
    /** File_Info */
    File_Info?: FileInfo;
}
