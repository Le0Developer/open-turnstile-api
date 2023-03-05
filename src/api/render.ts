import { TurnstileOptions } from "turnstile-types";
import createWidget from "../core/widget/create";
import { throwError } from "../shared";

export default function render(container: string | HTMLElement, options: TurnstileOptions) {
    if(typeof container === "string")
        container = document.querySelector(container) as HTMLElement;
    if(!(container instanceof HTMLElement))
        throwError(`Unable to find a container for ${container} (expected HTMLElement or selector)`);
    
    return createWidget(container, options);
}