import { Sonuc } from "./Sonuc";
import { SonucStr } from "./SonucStr";
import { GuıdAltUyeIsyeri } from "./GuıdAltUyeIsyeri";

/**
 * Pazaryeri_TP_AltUyeIsyeri_EklemeResult
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface PazaryeriTpAltUyeIsyeriEklemeResult {
    /** Sonuc */
    Sonuc?: Sonuc;
    /** Sonuc_Str */
    Sonuc_Str?: SonucStr;
    /** GUID_AltUyeIsyeri */
    GUID_AltUyeIsyeri?: GuıdAltUyeIsyeri;
}
