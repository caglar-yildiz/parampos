import { G } from "./G";

/** Pos_Plugin_Bildirim */
export interface PosPluginBildirim {
    /** G */
    G?: G;
    /** s:string */
    ETS_GUID?: string;
    /** s:string */
    Domain_Adres?: string;
    /** s:string */
    Yazilim_Bilgisi?: string;
    /** s:string */
    Yazilim_Surum_Bilgisi?: string;
}
