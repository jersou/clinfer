#!/usr/bin/env -S deno run -A

import $ from "jsr:@david/dax@0.48.2";
import { basename } from "jsr:@std/path@1.1.5";

const options = `
--no-line-number
--pad-horiz 1
--pad-vert 1
--background "#00000000"
--font 'Hack=16'
`;

const tsPaths = [
  "../docs/examples/demo/demo_class.ts",
  "../docs/examples/demo/demo_class_lite.ts",
  "../docs/examples/demo/demo_class_decorator.ts",
  "../docs/examples/demo/demo_function.ts",
  "../docs/examples/demo/demo_module_lite.ts",
  "../docs/examples/demo/demo_object.ts",
  "../docs/examples/demo/demo_object_lite.ts",
];

const tsPathsNoOutput = [
  "../docs/examples/cli-tools-diff/object-diff/yargs.ts",
  "../docs/examples/cli-tools-diff/object-diff/clinfer.ts",
  "../docs/examples/cli-tools-diff/esm-diff/yargs.ts",
  "../docs/examples/cli-tools-diff/esm-diff/clinfer.ts",
];

for (const path of [...tsPaths, ...tsPathsNoOutput]) {
  await $`silicon ${$.rawArg(options)} \
  --window-title ${basename(path)} ${path} \
  --output ${path}.png `.printCommand();
  await $`pngquant --quality=60-80 ${path}.png --output ${path}-pngquant.png`;
  await $`rm ${path}.png`;
  await $`mv ${path}-pngquant.png ${path}.png`;
}

for (const path of [...tsPaths]) {
  await $`silicon ${$.rawArg(options)} \
  --window-title "output of ${basename(path)}" \
  -l "Plain Text" --theme "Monokai Extended" \
  ${path + ".output"} --output ${path + ".output"}.png`.printCommand();
  await $`pngquant --quality=60-80 ${path + ".output"}.png --output ${
    path + ".output"
  }-pngquant.png`;
  await $`rm ${path + ".output"}.png`;
  await $`mv ${path + ".output"}-pngquant.png ${path + ".output"}.png`;
}
