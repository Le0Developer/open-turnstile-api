import { TurnstileOptions } from "turnstile-types";
import { widgets, WidgetState } from ".";
import { compatHCaptchaInputName, compatRecaptchaInputName, defaultInputName, fullWidgetIdPrefix, iframeOrigin, iframeSauce, legacyInputName } from "../../const";
import { compatibilityId } from "../compat";
import { parseImplicitOptions } from "../implicit";
import { isLegacySitekey } from "../legacy";
import defaultOptions from "../options/default";
import validateOptions from "../options/validation";
import { removeWidget } from "./data";
import { fullWidgetIdToWidgetId, generateWidgetId } from "./id";

export default function createWidget(container: HTMLElement, options?: TurnstileOptions) {
    const implicitOptions = flagImplicitRendering ? parseImplicitOptions(container) : {} as TurnstileOptions;
    const resolvedOptions = {
        ...defaultOptions,
        ...implicitOptions,
        ...(options || {}),
    } as TurnstileOptions;

    if(flagValidation)
        validateOptions(resolvedOptions);
    
    const widgetId = generateWidgetId();
    const widget = {
        id: widgetId,
        state: WidgetState.Loading,
        options: resolvedOptions,
        queue: resolvedOptions.execution === "render" ? [{ event: "execute" }] : [],
        token: "",
    };
    const fullWidgetId = fullWidgetIdPrefix + widgetId;

    widgets.set(widgetId, widget);

    const previousIframe = container.querySelector("iframe");
    if(previousIframe) {
        const widgetId = fullWidgetIdToWidgetId(previousIframe.id);
        if(widget) removeWidget(widgetId);
    }

    let iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.style.border = "none";
    iframe.style.overflow = "none";
    iframe.src = `${iframeOrigin}/cdn-cgi/challenge-platform/${iframeSauce}turnstile/if/ov2/av0/${widgetId}/${resolvedOptions.sitekey}/${resolvedOptions.theme}/${resolvedOptions.size}`;
    iframe.id = fullWidgetId;
    iframe.tabIndex = resolvedOptions.tabindex || 0;
    iframe.title = "Widget containing a Cloudflare security challenge";
    iframe.allow = "cross-origin-isolated";
    container.appendChild(iframe);
    if(flagInputElement && (resolvedOptions["response-field"] ?? true)) {
        createInputElement(resolvedOptions["response-field-name"] ?? defaultInputName, `${fullWidgetId}_response`, container);

        if(flagLegacySitekey && !resolvedOptions["response-field-name"] && isLegacySitekey(resolvedOptions.sitekey)) {
            createInputElement(legacyInputName, `${fullWidgetId}_legacy_response`, container);
        }
    }
    if((flagCompatRecaptcha || flagCompatHCaptcha) && compatibilityId) {
        createInputElement(compatRecaptchaInputName, `${fullWidgetId}_${compatibilityId}_response`, container);
    }

    return widgetId;
}


function createInputElement(name: string, id: string, container: HTMLElement) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.id = id;
    container.appendChild(input);
}
