import { Widget } from "../core/widget";
import { setWidgetToken } from "../core/widget/data";
import { CompleteTurnstileMessage } from "./types";

export default function handleComplete(message: CompleteTurnstileMessage, widget: Widget) {
    setWidgetToken(widget, message.token);
    widget.options.callback?.(message.token);
}
