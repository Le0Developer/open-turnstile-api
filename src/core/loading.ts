import { runImplicitRendering } from "./implicit";

let isLoaded = false;
let callbacks = [];
let autoRunImplicit = true;


function contentReady() {
    if(flagApiReady) {
        isLoaded = true;
        for(let callback of callbacks) callback();
    }
    if(flagImplicitRendering && autoRunImplicit)
        runImplicitRendering();
}

export function registerReadyCallback() {
    if(["complete", "interactive"].includes(document.readyState)) {
        setTimeout(contentReady, 0);
    } else {
        window.addEventListener("DOMContentLoaded", contentReady);
    }
}

export function addReadyCallback(callback: () => void) {
    if(isLoaded) {
        callback()
    } else {
        callbacks.push(callback);
    }
}

export function disableImplicitAutorun() {
    autoRunImplicit = false;
}
