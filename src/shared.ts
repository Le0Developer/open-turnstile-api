
export function format(a: string, b: Array<string>) {
    return a.replace(/%/g, () => b.shift())
};


const prefix = "[Cloudflare Turnstile]"

export function issueWarning(message: string) {
    console.warn(prefix, message);
}

export function throwError(message: string) {
    console.error(prefix, message);
    throw new Error(message);
}
