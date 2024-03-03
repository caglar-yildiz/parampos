import { DtBilgi4 } from "./DtBilgi4";

/**
 * Param_Pazaryeri_Islem_IzlemeResult
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface ParamPazaryeriIslemIzlemeResult {
    /** s:string */
    Sonuc?: string;
    /** s:string */
    Sonuc_Str?: string;
    /** DT_Bilgi */
    DT_Bilgi?: DtBilgi4;
    /** s:string */
    Durum_Onay?: string;
    /** s:string */
    SanalPOS_Banka?: string;
    /** s:string */
    SanalPOS_Islem_ID?: string;
    /** s:string */
    Odeme_Yapan_Bilgisi?: string;
    /** s:string */
    ODEME_TUTAR?: string;
    /** s:string */
    Komisyon_Odeyen_Aciklama?: string;
    /** s:string */
    islem_durumu?: string;
    /** s:string */
    tutar_urun?: string;
    /** s:string */
    AltUye_Isyeri_Ad_Soyad?: string;
    /** s:string */
    uye_isyeri_odeme_tutarı?: string;
    /** s:string */
    param_komisyon_orani?: string;
    /** s:string */
    param_komisyon_ucreti?: string;
    /** s:string */
    alt_uye_is_yeri_odeme_tutarı?: string;
    /** s:string */
    Valör?: string;
}
