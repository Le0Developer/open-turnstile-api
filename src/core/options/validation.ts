
import { TurnstileOptions } from "turnstile-types";
import { throwError, format } from "../../shared";


const errorFormat = "Invalid value for %, % %";

function checkIncludesFactory<T>(array: Array<T>) {
    return (item: T, name: string) => {
        if(array.indexOf(item) === -1)
            throwError(format(errorFormat, [name, "expected", array.join("|")]));   
    }
}

function checkRegexFactory(regex: RegExp) {
    return (input: string, name: string) => {
        if(!regex.test(input))
            throwError(format(errorFormat, [name, "must match", ""+regex]));
    }
}

const validators = flagValidation ? {
    sitekey: checkRegexFactory(/^[0-9a-z_-]{3,100}$/i),
    action: checkRegexFactory(/^[0-9a-z_-]{0,32}$/i),
    cData: checkRegexFactory(/^[0-9a-z_-]{0,255}$/i),
    theme: checkIncludesFactory(["auto", "dark", "light"]),
    language: checkRegexFactory(/^auto|[a-z]{2}(-[A-Z]{2})?$/),
    // tabindex: () => // there is no tabindex validation
    // "response-field": checkIncludesFactory([true, false]), // no validation
    // "response-field-name": () => // no validation
    size: checkIncludesFactory(["normal", "invisible", "compact"]),
    retry: checkIncludesFactory(["auto", "mever"]),
    "retry-interval": (value: number, name: string) => {
        if(value <= 0 || value >= 9e5)
            throwError(format(errorFormat, [name, "must be", "between 0 and 900,000"]));
    },
    "refresh-expired": checkIncludesFactory(["auto", "manual", "never"]),
    appearance: checkIncludesFactory(["always", "execute", "interaction-only"]),
    execution: checkIncludesFactory(["render", "execute"]),
} : {};

export default function validateOptions(options: TurnstileOptions) {
    for(const fieldName in validators) {
        const value = options[fieldName];
        if(value != undefined)
            validators[fieldName](value, fieldName);
    }
    if(!options.sitekey)
        throwError("sitekey is required");
}
