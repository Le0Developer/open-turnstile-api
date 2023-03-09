import { Widget } from ".";

export const EXECUTE_EVENT = { event: "execute" };

export function flushWidgetQueue(widget: Widget, iframe: HTMLIFrameElement) {
    while(widget.queue.length) {
        const event = widget.queue.pop();
        iframe.contentWindow.postMessage({
            source: "cloudflare-challenge",
            widgetId: widget.id,
            ...event,
        }, "*")
    }
}