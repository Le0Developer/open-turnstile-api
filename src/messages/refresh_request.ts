import { Widget } from "../core/widget";
import resetWidget from "../core/widget/reset";
import { RefreshRequestTurnstileMessage } from "./types";

export default function handleRefreshRequest(_: RefreshRequestTurnstileMessage, widget: Widget) {
    resetWidget(widget.id);
}
