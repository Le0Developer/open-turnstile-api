
import api from "./api";
import { runRecaptchaCompat } from "./core/compat";
import { getRuntimeFlags } from "./core/flags";
import { disableImplicitAutorun, registerReadyCallback } from "./core/loading";
import { turnstileMessageHandler } from "./core/comms";
import { issueWarning } from "./shared";


if(flagApi)
    window.turnstile = api;


if((flagApi && flagApiReady) || flagImplicitRendering) {
    registerReadyCallback();
}

if(flagQueryParameters) {
    const flags = getRuntimeFlags();
    if(flags) {
        flags.forEach((_, field) => {
            if(!["onload", "compat", "render"].includes(field))
                issueWarning(`Unknown parameter passed to api.js: "?${field}=...", ignoring`)
        })

        const compat = flags.get("compat");
        if(compat) {
            if(flagCompatRecaptcha && compat.toLowerCase() === "recaptcha") {
                runRecaptchaCompat(api);
            } else {
                issueWarning(`Unknown value for api.js?compat: "${compat}", ignoring`);
            }
        }

        const onload = flags.get("onload");
        if(onload)
            setTimeout(() => {
                if(flagQueryParameterOnLoadWithAPI)
                    window[onload]?.(api)
                else
                    window[onload]?.();
            }, 0);

        if(flagImplicitRendering && flags.get("render") === "explicit")
            disableImplicitAutorun();
    }
}

window.addEventListener("message", turnstileMessageHandler);
