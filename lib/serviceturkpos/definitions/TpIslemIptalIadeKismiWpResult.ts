import { List2 } from "./List2";

/**
 * TP_Islem_Iptal_Iade_Kismi_WPResult
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface TpIslemIptalIadeKismiWpResult {
    /** s:string */
    Sonuc?: string;
    /** s:string */
    Sonuc_Str?: string;
    /** s:string */
    Siparis_ID?: string;
    /** s:string */
    Ref_No?: string;
    /** List */
    List?: List2;
}
