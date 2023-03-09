import { TurnstileOptions } from "turnstile-types";
import { fullWidgetIdPrefix } from "../const";
import { widgets, WidgetState } from "../core/widget";
import { EXECUTE_EVENT, flushWidgetQueue } from "../core/widget/queue";
import { showWidget } from "../core/widget/ui";
import { throwError } from "../shared";
import render from "./render";
import { ContainerLike, getWidgetIdFromContainer } from "./_shared";

export default function execute(container: ContainerLike, options: TurnstileOptions) {
    let widgetId = getWidgetIdFromContainer(container);
    if(!widgetId) {
        if(!options) throwError("Please provide 2 parameters to execute: container and parameters");
        widgetId = render(container, options);
    }

    const widget = widgets.get(widgetId);
    if(!widget) return;

    if(widget.token)
        return widget.options?.callback(widget.token);
        
    widget.queue.push(EXECUTE_EVENT);

    const iframe = document.getElementById(fullWidgetIdPrefix + widget.id) as HTMLIFrameElement;
    if(!iframe) throwError(`Widget ${widget.id} to execute was not found.`);

    if(widget.state === WidgetState.Loaded)
        flushWidgetQueue(widget, iframe);
    if(widget.options.appearance === "execute")
        showWidget(widget, iframe);
}
