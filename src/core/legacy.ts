
// anything that starts with:
// 0x4AAAAAAAAAA
// 0x4AAAAAAAAj
export function isLegacySitekey(sitekey: string) {
    return /^0x4AAAAAAAA(j|AA)/.test(sitekey);
}
