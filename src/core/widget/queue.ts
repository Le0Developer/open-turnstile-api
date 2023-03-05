import { Widget } from ".";

export default function flushWidgetQueue(widget: Widget, iframe: HTMLIFrameElement) {
    while(widget.queue.length) {
        const event = widget.queue.pop();
        iframe.contentWindow.postMessage({
            source: "cloudflare-challenge",
            widgetId: widget.id,
            ...event,
        }, "*")
    }
}