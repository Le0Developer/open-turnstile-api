import { getCurrentUrl } from "../core/url";
import { Widget, WidgetState } from "../core/widget";
import { flushWidgetQueue } from "../core/widget/queue";
import { RequestExtraParametersTurnstileMessage } from "./types";

export default function handleRequestExtraParams(_: RequestExtraParametersTurnstileMessage, widget: Widget, iframe: HTMLIFrameElement) {
    widget.state = WidgetState.Loaded;
    widget.queue.push({
        event: "extraParams",
        url: getCurrentUrl(),
        ...Object.fromEntries(Object.entries(widget.options).filter(([_, v]) => typeof v !== "function"))
    });
    flushWidgetQueue(widget, iframe);
}
