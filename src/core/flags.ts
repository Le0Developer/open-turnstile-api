
let currentScript = document.currentScript as HTMLScriptElement;
if(!currentScript.src.includes("turnstile")) currentScript = null;

export function getRuntimeFlags() {
    return currentScript && new URL(currentScript.src).searchParams;
}

export function isLoadedAsync() {
    return currentScript && (currentScript.async || currentScript.defer);
}
