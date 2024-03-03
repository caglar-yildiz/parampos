import { List1 } from "./List1";

/**
 * TP_Islem_Sorgulama_WPResult
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface TpIslemSorgulamaWpResult {
    /** s:string */
    Sonuc?: string;
    /** s:string */
    Sonuc_Str?: string;
    /** s:string */
    Siparis_ID?: string;
    /** s:string */
    Islem_ID?: string;
    /** s:string */
    Ref_No?: string;
    /** s:string */
    Durum?: string;
    /** List */
    List?: List1;
}
