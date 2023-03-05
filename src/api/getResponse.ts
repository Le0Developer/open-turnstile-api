import { widgets } from "../core/widget";
import { throwError } from "../shared";
import { format } from "../shared";
import { containerError, ContainerLike, getWidgetIdFromContainer } from "./_shared";

export default function getResponse(container: ContainerLike) {
    const widgetId = getWidgetIdFromContainer(container);
    if(!widgetId) throwError(format(containerError, ["getResponse", ""+container]));


    const widget = widgets.get(widgetId);
    if(!widget) throwError(format(containerError, ["getResponse", ""+container]));

    return widget.token;
}
