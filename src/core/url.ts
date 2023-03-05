
// Can't directly use location.href because of fake iframes,
// traverse the "stack" until we find a correct url

// > Hi guys, we're using iframe with dynamic injection content where src
// > is about:blank . We're facing an invalid domain, something we
// > previously fixed with the hCaptcha team was 
// > window.top.location.href instead of location.href if the src is not
// > a valid URL format.

export function getCurrentUrl() {
    let wnd: Window = window;
    // using regex here because it's slightly shorter than .startsWith
    // !/^http/.test(wnd.location.href)
    // !wnd.location.href.startsWith("http")
    while(wnd !== wnd.top && !/^http/.test(wnd.location.href)) {
        wnd = wnd.top;
    }
    return wnd.location.href;
}
