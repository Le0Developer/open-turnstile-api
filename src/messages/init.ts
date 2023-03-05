import { Widget } from "../core/widget";
import { hideWidget, showWidget } from "../core/widget/ui";
import { InitTurnstileMessage } from "./types";

export default function handleInit(message: InitTurnstileMessage, widget: Widget, iframe: HTMLIFrameElement) {
    widget.mode = message.mode;
    if(widget.options.appearance === "always")
        showWidget(widget, iframe);
    else
        hideWidget(iframe);
    iframe.style.display = "";
}
