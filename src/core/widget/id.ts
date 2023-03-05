import { widgets } from ".";
import { fullWidgetIdPrefix } from "../../const";

export function fullWidgetIdToWidgetId(widgetId: string): string {
    return widgetId.startsWith(fullWidgetIdPrefix) && widgetId.substring(fullWidgetIdPrefix.length);
}

export function generateWidgetId() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
    while(true) {
        let widgetId = "";
        for(let i = 0; i < 5; i++)
            // ^ 0 for rounding, shorter than Math.floor
            widgetId += alphabet.charAt(Math.random() * alphabet.length ^ 0);
        if(!widgets.has(widgetId)) return widgetId;
    }
}
