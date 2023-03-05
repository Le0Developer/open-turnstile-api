import { throwError } from "../shared";
import { Widget } from "../core/widget";
import { setWidgetToken } from "../core/widget/data";
import { FailTurnstileMessage } from "./types";

export default function handleFail(message: FailTurnstileMessage, widget: Widget) {
    setWidgetToken(widget, "");
    widget.options["error-callback"]?.();
    if(message.code) throwError(`Failed with code: ${message.code}`);
}
