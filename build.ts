
import * as esbuild from "esbuild";
import * as fs from "node:fs/promises";

import config from "./config";


async function build() {
    const result = await esbuild.build({
        entryPoints: ["src/index.ts"],
        bundle: true,
        minify: true,
        outfile: "dist/turnstile.js",
        metafile: true,
        sourcemap: true,
        define: config,
    });
    await fs.writeFile("dist/turnstile.meta.json", JSON.stringify(result.metafile));
}


build();