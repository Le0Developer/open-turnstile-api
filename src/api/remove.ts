import { removeWidget } from "../core/widget/data";
import { throwError } from "../shared";
import { format } from "../shared";
import { containerError, ContainerLike, getWidgetIdFromContainer } from "./_shared";

export default function remove(container: ContainerLike) {
    const widgetId = getWidgetIdFromContainer(container);
    if(!widgetId) throwError(format(containerError, ["remove", ""+container]));

    removeWidget(widgetId);
}
