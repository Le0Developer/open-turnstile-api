import { fullWidgetIdPrefix, iframeOrigin } from "../const";
import handleComplete from "../messages/complete";
import handleFail from "../messages/fail";
import handleInit from "../messages/init";
import { Widget, widgets } from "./widget";
import handleInteractiveBegin from "../messages/interactive_begin";
import handleInteractiveEnd from "../messages/interactive_end";
import handleInteractiveTimeout from "../messages/interactive_timeout";
import handleRefreshRequest from "../messages/refresh_request";
import handleRequestExtraParams from "../messages/request_extra_params";
import handleTokenExpired from "../messages/token_expired";
import { TurnstileMessage } from "../messages/types";

const handlers: {[event: string]: (message: TurnstileMessage, widget: Widget, iframe: HTMLIFrameElement) => any} = {
    init: handleInit,
    complete: handleComplete,
    fail: handleFail,
    tokenExpired: handleTokenExpired,
    refreshRequest: handleRefreshRequest,
    interactiveBegin: handleInteractiveBegin,
    interactiveTimeout: handleInteractiveTimeout,
    interactiveEnd: handleInteractiveEnd,
    requestExtraParams: handleRequestExtraParams,
}


export function turnstileMessageHandler(event: MessageEvent<TurnstileMessage>) {
    const { data } = event;
    if(event.origin !== iframeOrigin || data.source !== "cloudflare-challenge") return;
    const widget = widgets.get(data.widgetId);
    const iframe = document.getElementById(fullWidgetIdPrefix + data.widgetId) as HTMLIFrameElement;
    if(!widget || !iframe) return;
    handlers[data.event](data, widget, iframe);
}
