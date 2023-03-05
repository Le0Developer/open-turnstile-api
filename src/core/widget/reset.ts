import { widgets, WidgetState } from ".";
import { fullWidgetIdPrefix } from "../../const";
import { throwError } from "../../shared";
import { setWidgetToken } from "./data";
import { hideWidget } from "./ui";

export default function resetWidget(widgetId: string) {
    const widget = widgets.get(widgetId);
    if(widget.state === WidgetState.Loading) return;

    setWidgetToken(widget, "");
    widget.state = WidgetState.Loading;
    widget.mode = null;
    widget.queue = [];

    const iframe = document.getElementById(fullWidgetIdPrefix + widget.id) as HTMLIFrameElement;
    if(!iframe) throwError(`Widget ${widget.id} to reset was not found.`);

    if(widget.options.appearance === "interaction-only")
        hideWidget(iframe);
    
    if(widget.options.execution === "render")
        widget.queue.push("render");
    
    iframe.src += "";
}