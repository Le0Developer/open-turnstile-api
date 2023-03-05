import { widgets } from "../core/widget";
import { fullWidgetIdToWidgetId } from "../core/widget/id";

export type ContainerLike = string | HTMLElement | undefined;

export const containerError = "Nothing to % found for %";

export function getWidgetIdFromContainer(container: ContainerLike): string | null {
    if((flagApiContainerAllowWidgetId || flagApiContainerAllowSelector) && typeof container === "string") {
        if(flagApiContainerAllowWidgetId) {
            const widgetId = fullWidgetIdToWidgetId(container);
            if(widgets.has(widgetId)) return widgetId;
        }
        if(flagApiContainerAllowSelector) {
            try {
                const element = document.querySelector(container) as HTMLElement;
                return element ? getWidgetIdFromContainer(element) : null;
            } catch {
                return null;
            }
        }
    }
    if(flagApiContainerAllowElement && container instanceof HTMLElement) {
        const iframe = container.querySelector("iframe");
        return (iframe && fullWidgetIdToWidgetId(iframe.id)) || null;
    }
    if(flagApiContainerAllowNothing && !container && widgets.size > 0)
        return widgets.keys().next().value;

    return null;
}
