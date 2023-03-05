import { Widget } from "../core/widget";
import { setWidgetToken } from "../core/widget/data";
import { InteractiveTimeoutTurnstileMessage } from "./types";

export default function handleInteractiveTimeout(_: InteractiveTimeoutTurnstileMessage, widget: Widget, iframe: HTMLIFrameElement) {
    setWidgetToken(widget, "");
    widget.options["timeout-callback"]?.();
}
