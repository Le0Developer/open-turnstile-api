import { throwError } from "../shared";
import { format } from "../shared";
import { containerError, ContainerLike, getWidgetIdFromContainer } from "./_shared";
import { widgets } from "../core/widget";
import resetWidget from "../core/widget/reset";


export default function reset(container: ContainerLike) {
    const widgetId = getWidgetIdFromContainer(container);
    if(!widgetId) throwError(format(containerError, ["reset", ""+container]));

    const widget = widgets.get(widgetId);
    if(!widget) throwError(format(containerError, ["reset", ""+container]));

    return resetWidget(widgetId);
}