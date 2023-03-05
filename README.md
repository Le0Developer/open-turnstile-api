
# open-turnstile-api

[Turnstile's api.js](https://challenges.cloudflare.com/turnstile/v0/api.js) but
**Open-source**, written in **Typescript**, with conditional compilation to
get the bundle really small.

By default, with all of Turnstile's features, this project is around 60% of the
original size (~7.4kb from 14kb). By tweaking the options, it's possible to 
cut it down to ~3.5kb, with only `turnstile.render()`, no `?onload=` callback,
no implicit rendering, no option validation and less!

See [config.ts](config.ts) for all options.

## Building

Run `npm run build` and it should compile to `dist/turnstile.js`.
Source maps are also included in `dist/turnstile.js.map`.

We also export the [esbuild metafile](https://esbuild.github.io/api/#analyze)
as `dist/turnstile.meta.json` which you can use with 
[esbuild's bundle analyzer](https://esbuild.github.io/analyze/) to see which
modules use up space.

## License

MIT

## Disclaimer

Cloudflare could change the internals at any time, so this may break at any time!

Don't use this in production. (if you do, make sure you can swap to regular
turnstile at any time)
