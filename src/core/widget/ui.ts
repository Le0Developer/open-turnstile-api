import { Widget } from ".";

export function showWidget(widget: Widget, iframe: HTMLIFrameElement) {
    const style = iframe.style;
    if(widget.mode === "invisible") {
        style.position = "absolute";
        hideWidget(iframe);
    } else {
        const isCompact = widget.options.size === "compact";
        style.width = isCompact ? "130px" : "300px";
        style.height = isCompact ? "120px" : "65px";
    }
}

export function hideWidget(iframe: HTMLIFrameElement) {
    iframe.style.width = "0";
    iframe.style.height = "0";
}
