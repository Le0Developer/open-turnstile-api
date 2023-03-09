import { TurnstileObject } from "turnstile-types";
import { issueWarning } from "../shared";

export let compatibilityId = undefined;

export function enableCompatibility(api: TurnstileObject, name: string, input: string) {
    const wnd = window as any;
    if(name in wnd) {
        issueWarning(name + " is already defined. The compatibility layer will not be enabled");
    } else {
        issueWarning("Compatibility layer enabled");
        wnd[name] = api;
        compatibilityId = input;
    }
}
