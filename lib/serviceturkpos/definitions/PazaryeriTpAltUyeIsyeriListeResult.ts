import { DtBilgi3 } from "./DtBilgi3";

/**
 * Pazaryeri_TP_AltUyeIsyeri_ListeResult
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface PazaryeriTpAltUyeIsyeriListeResult {
    /** s:int */
    Toplam_Kayit?: string;
    /** DT_Bilgi */
    DT_Bilgi?: DtBilgi3;
    /** s:int */
    Sonuc?: string;
    /** s:string */
    Sonuc_Str?: string;
    /** s:string */
    GUID_AltUyeIsyeri?: string;
}
