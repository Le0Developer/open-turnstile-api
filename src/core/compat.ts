import { TurnstileObject } from "turnstile-types";
import { format, issueWarning } from "../shared";

export enum CompatibilityMode {
    None,
    ReCAPTCHA,
    HCaptcha,
}

export let compatibilityMode = CompatibilityMode.None;

const success = "Compatibility layer enabled";
const error = "% is already defined. The compatibility layer will not be enabled";
export function runRecaptchaCompat(api: TurnstileObject) {
    const wnd = window as any;
    if(wnd.grecaptcha) {
        issueWarning(format(error, ["grecaptcha"]));
    } else {
        issueWarning(success);
        wnd.grecaptcha = api;
        compatibilityMode = CompatibilityMode.ReCAPTCHA;
    }
}

export function runHCaptchaCompat(api: TurnstileObject) {
    const wnd = window as any;
    if(wnd.hcaptcha) {
        issueWarning(format(error, ["hcaptcha"]));
    } else {
        issueWarning(success);
        wnd.hcaptcha = api;
        compatibilityMode = CompatibilityMode.HCaptcha;
    }
}
