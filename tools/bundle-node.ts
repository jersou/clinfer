#!/usr/bin/env -S deno run -A

import $ from "jsr:@david/dax@0.45.0";
Deno.chdir($.path(import.meta.url + "/../.."));
const code = await $`deno bundle ./mod.ts`.printCommand().text();
await $`mkdir -p node/dist`.printCommand();
Deno.writeTextFileSync("node/dist/mod.mjs", code);
await $`npx --yes -p typescript tsc ./mod.ts --declaration --allowJs --emitDeclarationOnly --outDir node/dist`
  .printCommand()
  .noThrow();
await $`deno fmt node/dist`.printCommand();
await $`rm -rf node/dist/node/`.printCommand().noThrow();
for (const entry of $.path("node/dist/src").readDirSync()) {
  const content = entry.path.readTextSync().replaceAll('.ts"', '.d.ts"');
  entry.path.writeTextSync(content);
}
await $`cp README.md node/README.md`.printCommand();
