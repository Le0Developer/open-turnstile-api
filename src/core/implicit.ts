import { TurnstileOptions } from "turnstile-types";
import { compatibilityMode, CompatibilityMode } from "./compat";
import createWidget from "./widget/create";

const callback = (object: any, value: string, field: string) => object[field] = window[value];
const number = (object: any, value: string, field: string) => object[field] = +value;

const transformations = {
    cdata: (object: any, value: any) => object.cData = value,
    callback,
    "error-callback": callback,
    "expired-callback": callback,
    "timeout-callback": callback,
    tabindex: number,
    "retry-interval": number,
    "response-field": (object: any, value: any, field: string) => object[field] = !value || value === "true",
};

export function parseImplicitOptions(element: HTMLElement): TurnstileOptions {
    const fields = element.getAttributeNames().filter(x => x.startsWith("data-")).map(x => x.substring(5));
    const options = {};
    fields.forEach((field) => {
        const value = element.getAttribute(field);
        if(transformations[field])
            transformations[field](options, value, field);
        else
            options[field] = value;
    })
    return options as TurnstileOptions;
}

export function runImplicitRendering() {
    let query = ".cf-turnstile,.cf-challenge";
    if(flagCompatRecaptcha && compatibilityMode === CompatibilityMode.ReCAPTCHA)
        query += ",.g-recaptcha";
    if(flagCompatHCaptcha && compatibilityMode === CompatibilityMode.HCaptcha)
        query += ",.h-recaptcha";
    const matches = document.querySelectorAll(query) as NodeListOf<HTMLElement>;
    matches.forEach((element) => createWidget(element));
}
