import { Widget } from "../core/widget";
import { hideWidget } from "../core/widget/ui";
import { InteractiveEndTurnstileMessage } from "./types";

export default function handleInteractiveEnd(message: InteractiveEndTurnstileMessage, widget: Widget, iframe: HTMLIFrameElement) {
    if(widget.options.appearance === "interaction-only") {
        hideWidget(iframe);
    }
}
