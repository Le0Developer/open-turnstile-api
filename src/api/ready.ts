import { isLoadedAsync } from "../core/flags";
import { addReadyCallback } from "../core/loading";
import { throwError } from "../shared";

export default function ready(callback: () => void) {
    if(isLoadedAsync())
        throwError("Remove async/defer from the Turnstile api.js script tag before using turnstile.ready().");

    addReadyCallback(callback);
}