import { Widget } from "../core/widget";
import { showWidget } from "../core/widget/ui";
import { InteractiveBeginTurnstileMessage } from "./types";

export default function handleInteractiveBegin(_: InteractiveBeginTurnstileMessage, widget: Widget, iframe: HTMLIFrameElement) {
    if(widget.options.appearance === "interaction-only") {
        showWidget(widget, iframe);
    }
}
