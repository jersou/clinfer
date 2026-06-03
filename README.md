<p align="center" dir="auto">
  <a href="https://jersou.github.io/clinfer/" rel="nofollow">
    <img alt="clinfer" src="docs/clinfer.svg" style="max-width: 100px;">
  </a>
  <br/>
<b>clinfer JS (CLI infer-ence) : auto generate CLIs from code</b>
  <br/>
  <a href="https://npmjs.org/package/clinfer" rel="nofollow"><img src="https://img.shields.io/npm/v/clinfer.svg" alt="clinfer on NPM"></a>
  <a href="https://jsr.io/@jersou/clinfer" rel="nofollow"><img src="https://jsr.io/badges/@jersou/clinfer" alt="JSR"></a>
  <a href="https://jsr.io/@jersou/clinfer" rel="nofollow"><img src="https://jsr.io/badges/@jersou/clinfer/score" alt="JSR Score"></a>
  <a href="https://github.com/jersou/clinfer" rel="nofollow"><img src="https://img.shields.io/badge/github-repo-blue?logo=github" alt="github"></a>
  <a href="https://jsr.io/@std" rel="nofollow"><img src="https://img.shields.io/badge/Built_with_std-blue?logo=deno" alt="Built with the Deno Standard Library"></a>
</p>

clinfer brings **CLI** **infer**-ence to Node, Deno, and Bun. Pass it an object,
a class, an ES module or a function, and watch it build your interface
automatically:

- Each field/property generates a CLI option (flag).
- Each method/function generates a CLI command (with parameters as positional
  arguments).

Simply write your tool as a standard JS object, class or ES module, and hand it
over to clinfer. It will automatically parse the command-line arguments, map
them to your code, execute the right methods, and handle the help menu. You can
then easily customize the generated help, add aliases, and fine-tune your CLI.

## Overview : example with an object

<table>
  <tr valign="top">
    <td><img src="docs/examples/demo/demo_object_lite.ts.png" alt="docs/examples/demo/demo_object_lite.ts.png" width="100%" /></td>
    <td><img src="docs/examples/demo/demo_object_lite.ts.output.png" alt="docs/examples/demo/demo_object_lite.ts.output.png" width="100%" /></td>
  </tr>
</table>

## Features

- The help is generated automatically:

![help image](docs/examples/simple-help.png)

<!-- Plain text (without color and styles in markdown):
$ ./simple.ts --help
Usage: <script path> [Options] [--] [command [cmd args]]

Commands:
  main                   [default]
  up
  down <force> <timeout>

Options:
 -h, --help    Show this help [default: false]
     --retry                      [default: 2]
     --dry-run                [default: false]
     --web-url               [default: "none"]
-->

- Run the commands with options and arguments

```shell
#             ↓↓↓↓↓↓↓↓↓↓↓↓↓ options ↓↓↓↓↓↓↓↓↓↓↓↓  ↓ command ↓  ↓ cmd args ↓
$ ./simple.ts --dry-run --web-url=tttt --retry 4     down        true  14
down command { force: true, timeout: 14 } Tool { retry: 4, dryRun: true, webUrl: 'tttt' }

$ ./simple.ts down true 14                     #  ↓↓↓  default options from class init  ↓↓↓
down command { force: true, timeout: 14 } Tool { retry: 2, dryRun: false, webUrl: 'none' }

$ ./simple.ts --dry-run --webUrl=tttt # ← same case of the field name works too : --webUrl or --web-url
main command Tool { retry: 2, dryRun: true, webUrl: 'tttt' } # ← main is the default command
```

## Documentation 📚

**The full documentation of clinfer is here https://jersou.github.io/clinfer/.**

## Install

- with NodeJS/NPM : `npm install clinfer` then
  `import { clinfer } from "clinfer";`
- with Deno : `deno add clinfer` or `deno add jsr:@jersou/clinfer`

## Other examples

Several examples can be found in the [docs/examples/](./docs/examples) folder.

### Example with a class

<table>
  <tr valign="top">
    <td><img src="docs/examples/demo/demo_class_lite.ts.png" alt="docs/examples/demo/demo_class_lite.ts.png" width="100%" /></td>
    <td><img src="docs/examples/demo/demo_class_lite.ts.output.png" alt="docs/examples/demo/demo_class_lite.ts.output.png" width="100%" /></td>
  </tr>
</table>

### Example with a function

<table>
  <tr valign="top">
    <td><img src="docs/examples/demo/demo_function.ts.png" alt="docs/examples/demo/demo_function.ts.png" width="100%" /></td>
    <td><img src="docs/examples/demo/demo_function.ts.output.png" alt="docs/examples/demo/demo_function.ts.output.png" width="100%" /></td>
  </tr>
</table>

### Example with a module (ESM)

<table>
  <tr valign="top">
    <td><img src="docs/examples/demo/demo_module_lite.ts.png" alt="docs/examples/demo/demo_module_lite.ts.png" width="100%" /></td>
    <td><img src="docs/examples/demo/demo_module_lite.ts.output.png" alt="docs/examples/demo/demo_module_lite.ts.output.png" width="100%" /></td>
  </tr>
</table>

### Full example with decorators (Typescript, Deno)

Works with vanilla TypeScript or with experimentalDecorators = true

<table>
  <tr>
    <td><img src="docs/examples/demo/demo_class_decorator.ts.png" alt="docs/examples/demo/demo_class_decorator.ts.png" width="100%" /></td>
    <td><img src="docs/examples/demo/demo_class_decorator.ts.output.png" alt="docs/examples/demo/demo_class_decorator.ts.output.png" width="100%" /></td>
  </tr>
</table>

### Full example without decorator (Javascript)

<table>
  <tr>
    <td><img src="docs/examples/demo/demo_class.ts.png" alt="docs/examples/demo/demo_class.ts.png" width="100%" /></td>
    <td><img src="docs/examples/demo/demo_class.ts.output.png" alt="docs/examples/demo/demo_class.ts.output.png" width="100%" /></td>
  </tr>
</table>
