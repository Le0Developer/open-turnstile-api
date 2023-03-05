import { TurnstileObject } from "turnstile-types";
import { issueWarning } from "../shared";

export let reCaptchaCompatEnabled = false;

export function runRecaptchaCompat(api: TurnstileObject) {
    const wnd = window as any;
    if(wnd.grecaptcha) {
        issueWarning("grecaptcha is already defined. The compatibility layer will not be enabled");
    } else {
        issueWarning("Compatibility layer enabled");
        wnd.grecaptcha = api;
        reCaptchaCompatEnabled = true;
    }
}
