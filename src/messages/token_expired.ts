import { Widget } from "../core/widget";
import resetWidget from "../core/widget/reset";
import { TokenExpiredTurnstileMessage } from "./types";

export default function handleTokenExpired(message: TokenExpiredTurnstileMessage, widget: Widget) {
    widget.options["expired-callback"]?.(message.token);
    resetWidget(widget.id);
}
