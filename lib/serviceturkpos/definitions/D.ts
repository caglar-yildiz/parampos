import { G } from "./G";
import { Data } from "./Data";

/**
 * d
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface D {
    /** G */
    G?: G;
    /** s:string */
    AccountId?: string;
    /** Data */
    Data?: Data;
}
