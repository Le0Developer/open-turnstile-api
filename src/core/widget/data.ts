import { Widget, widgets } from ".";
import { fullWidgetIdPrefix } from "../../const";
import { compatibilityId } from "../compat";

let rawQuery = "iframe#%,input#%_response";
if(flagLegacySitekey)
    rawQuery += ",input#%_legacy_response"

function getQuery(widgetId: string) {
    let query = rawQuery;
    if((flagCompatRecaptcha || flagCompatHCaptcha) && compatibilityId)
        query += `,input#%_${compatibilityId}_response`;
    return query.replace(/%/, fullWidgetIdPrefix + widgetId);
}

export function setWidgetToken(widget: Widget, token: string) {
    widget.token = token;
    const query = getQuery(widget.id);
    document.querySelectorAll(query).forEach((x: HTMLInputElement) => {
        // also sets it on the iframe, but it's *fineee*
        x.value = token;
    });
}

export function removeWidget(widgetId: string) {
    const query = getQuery(widgetId);
    document.querySelectorAll(query).forEach((x) => x.remove());
    widgets.delete(widgetId);
}
