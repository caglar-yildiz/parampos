
/**
 * Status
 * @targetNSAlias `tns`
 * @targetNamespace `https://turkpos.com.tr/`
 */
export interface Status {
    /** s:long */
    Islem_ID?: string;
    /** s:string */
    Islem_GUID?: string;
    /** s:string */
    UCD_HTML?: string;
    /** s:string */
    UCD_MD?: string;
    /** s:string */
    Sonuc?: string;
    /** s:string */
    Sonuc_Str?: string;
    /** s:string */
    Bank_Trans_ID?: string;
    /** s:string */
    Bank_AuthCode?: string;
    /** s:string */
    Bank_HostMsg?: string;
    /** s:int */
    Banka_Sonuc_Kod?: string;
    /** s:string */
    Bank_Extra?: string;
    /** s:string */
    Siparis_ID?: string;
    /** s:string */
    Bank_HostRefNum?: string;
}
