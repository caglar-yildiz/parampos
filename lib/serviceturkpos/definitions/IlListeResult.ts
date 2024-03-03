import { Dt } from "./Dt";

/**
 * Il_ListeResult
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface IlListeResult {
    /** s:int */
    Sonuc?: string;
    /** s:string */
    Sonuc_Str?: string;
    /** DT */
    DT?: Dt;
}
