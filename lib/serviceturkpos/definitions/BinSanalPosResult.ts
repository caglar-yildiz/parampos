import { DtBilgi } from "./DtBilgi";

/**
 * BIN_SanalPosResult
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface BinSanalPosResult {
    /** DT_Bilgi */
    DT_Bilgi?: DtBilgi;
    /** s:string */
    Sonuc?: string;
    /** s:string */
    Sonuc_Str?: string;
}
