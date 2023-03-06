import { Widget, widgets } from ".";
import { fullWidgetIdPrefix } from "../../const";

let rawQuery = "iframe#%,input#%_response";
if(flagLegacySitekey)
    rawQuery += ",input#%_legacy_response"
if(flagCompatRecaptcha)
    rawQuery += ",input#%_g_response";
if(flagCompatHCaptcha)
    rawQuery += ",input#%_h_response";

export function setWidgetToken(widget: Widget, token: string) {
    widget.token = token;
    const query = rawQuery.replace(/%/g, fullWidgetIdPrefix + widget.id);
    document.querySelectorAll(query).forEach((x: HTMLInputElement) => {
        // also sets it on the iframe, but it's *fineee*
        x.value = token;
    });
}

export function removeWidget(widgetId: string) {
    const query = rawQuery.replace(/%/g, fullWidgetIdPrefix + widgetId);
    document.querySelectorAll(query).forEach((x) => x.remove());
    widgets.delete(widgetId);
}
