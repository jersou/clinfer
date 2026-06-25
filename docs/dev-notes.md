## Dependencies (all)

- [jsr.io/@std/cli](https://jsr.io/@std/cli) : to parse args
- [jsr.io/@std/fmt](https://jsr.io/@std/cli) : to log with colors/bold
- [jsr.io/@std/text](https://jsr.io/@std/cli) : to change the option case
- [jsr.io/@std/collections](https://jsr.io/@std/collections) : to deepMerge
  metadata
- [jsr.io/@std/assert](https://jsr.io/@std/cli) : for the tests

## Inspiration

Probably inspired by:

- [Bash-utils](https://github.com/jersou/bash-utils#principes) : run bash
  function from CLI with `utils:run "$@"` to call bash function from the CLI, I
  created 4 years before clinfer,
- and by [Clap](https://github.com/clap-rs/clap) with the derive feature ( Rust)
  after the development of
  [mouse-actions](https://github.com/jersou/mouse-actions) (one year before
  clinfer) : deserialize options from CLI to struct.

Note: I have only recently discovered (May 2026) other projects sharing the same
concept.

- [python-fire](https://github.com/google/python-fire) : Python Fire is a
  library for automatically generating command line interfaces (CLIs) from
  absolutely any Python object.
- [typer](https://github.com/fastapi/typer) : Typer, build great CLIs. Easy to
  code. Based on Python type hints.

## Comparison with other tools : Yargs, @std/cli (minimist)

The usual tools rather take a particular configuration of the tool and produce
an output data **without** a defined model. You need to learn their API to
define the interface you want.

**clinfer follows a different approach: it takes the desired model and fills it
according to the command line**. If you want to type the parsing output, you
don't need to do anything else. No duplicate writing for the CLI config and the
parsing output model/type.

And of course, like classic tools, it also generates the help automatically,
detects the non-existent option/order errors, and launches the desired command
with its parameters.

A comparison try is made in the
[examples/cli-tools-diff](examples/cli-tools-diff) folder, it compares :

- clinfer :
  [examples/cli-tools-diff/clinfer.ts](examples/cli-tools-diff/clinfer.ts)
- vs [Yargs](https://github.com/yargs/yargs) :
  [examples/cli-tools-diff/yargs.ts](examples/cli-tools-diff/yargs.ts)
- vs [@std/cli](https://jsr.io/@std/cli/doc/parse-args) based on
  [minimist](https://github.com/minimistjs/minimist) :
  [examples/cli-tools-diff/std-cli.ts](examples/cli-tools-diff/std-cli.ts)

These 3 files provide the same CLI :

```
Usage: <script path> [Options] [--] [command [cmd args]]

Commands:
  main                   [default]
  up                     create and start
  down <force> <timeout>

Options:
 -h, --help    Show this help  [default: false]
 -r, --retry                       [default: 2]
 -n, --dry-run no changes mode [default: false]
     --web-url web url        [default: "none"]
```

The 3 implementations side by side :

[![diff-600.png](examples/cli-tools-diff/diff-600.png)](./examples/cli-tools-diff/diff.png)

A simpler comparaison from
[clinfer.ts](examples/cli-tools-diff/object-diff/clinfer.ts) :

<table>
  <tr valign="top">
    <td><img src="examples/cli-tools-diff/object-diff/clinfer.ts.png" alt="examples/cli-tools-diff/esm-diff/clinfer.ts.png" width="100%" /></td>
    <td><img src="examples/cli-tools-diff/object-diff/yargs.ts.png" alt="examples/cli-tools-diff/esm-diff/yargs.ts.png" width="100%" /></td>
  </tr>
</table>

Another with module from
[examples/cli-tools-diff/esm-diff](examples/cli-tools-diff/esm-diff) :

<table>
  <tr valign="top">
    <td><img src="examples/cli-tools-diff/esm-diff/clinfer.ts.png" alt="examples/cli-tools-diff/esm-diff/clinfer.ts.png" width="100%" /></td>
    <td><img src="examples/cli-tools-diff/esm-diff/yargs.ts.png" alt="examples/cli-tools-diff/esm-diff/yargs.ts.png" width="100%" /></td>
  </tr>
</table>

## Migration from yargs to clinfer example

As mentioned in the "[clinfer inputs](clinfer-input.md) > Real case" chapter,
[one of my projects](https://github.com/jersou/studio-pack-generator) uses
"clinfer" and features
[a massive CLI](https://github.com/jersou/studio-pack-generator?tab=readme-ov-file#cli-usage).
This project previously used Yargs.
[The migration commit](https://github.com/jersou/studio-pack-generator/commit/bb109f00252d26f16d08ec151e1197223fb55079)
clearly highlights the difference in usage :

- with yargs : 351 lines for
  [yargs configuration](https://github.com/jersou/studio-pack-generator/blob/696b7842374ff0b3cc20134a11e8f76bd29998a2/utils/parse_args.ts) +
  45 lines for
  ["CLI type"](https://github.com/jersou/studio-pack-generator/blob/696b7842374ff0b3cc20134a11e8f76bd29998a2/common-types.ts)

- with clinfer : 235 lines for
  [clinfer input & "CLI type"](https://github.com/jersou/studio-pack-generator/blob/bb109f00252d26f16d08ec151e1197223fb55079/studio_pack_generator.ts)

## Links

- https://github.com/jersou/clinfer
- https://www.npmjs.com/package/clinfer
- https://jsr.io/@jersou/clinfer

## Overall Architecture

Clinfer is designed to transform JavaScript/TypeScript objects or classes into
Command Line Interfaces (CLIs). It uses reflection to extract the structure of
the provided model and maps command-line arguments onto this model.

### Main Execution Flow

The following diagram illustrates the path from the `clinfer()` call to the
command execution:

```mermaid
sequenceDiagram
    participant App as Application (User)
    participant Clinfer as clinfer_parser.ts (clinfer)
    participant Metadata as metadata.ts (getClinferMetadata)
    participant ParseArgs as parse_args.ts (clinferParseArgs)
    participant Help as help.ts (genHelp)
    participant Command as command.ts (runCommand)

    App->>Clinfer: clinfer(objOrClass, config)
    Clinfer->>Metadata: getClinferMetadata(obj)
    Metadata-->>Clinfer: Metadata (fields, methods, subcommands)
    Clinfer->>ParseArgs: clinferParseArgs(obj, metadata, config)
    ParseArgs-->>Clinfer: ClinferArgsResult (options, command, args)

    alt Help requested (--help)
        Clinfer->>Help: genHelp(obj, metadata, config)
        Help-->>Clinfer: help string
        Clinfer->>App: Displays help and exits
    else Parsing error
        Clinfer->>App: Displays error and exits
    else Success
        Clinfer->>Command: runCommand(result)
        Command->>App: Executes the object method
    end
```

## File Organization

Most of the source code is located in the `src/` directory. Here is a
description of the key files:

### Parser Core

- **`mod.ts`** (root): Main entry point that exports decorators, types, and the
  `clinfer` function.
- **`src/clinfer_parser.ts`**: Contains the main `clinfer()` function that
  orchestrates the parsing and execution process.
- **`src/metadata.ts`**: Responsible for extracting metadata from the object or
  class. It aggregates information from raw reflection and decorators.
- **`src/types.ts`**: Defines the interfaces and types used throughout the
  project (`ClinferRunConfig`, `Metadata`, etc.).

### Argument Parsing and Help

- **`src/parse_args.ts`**: Handles the actual analysis of command-line arguments
  (uses `@std/cli/parse-args`). It links raw arguments to the fields defined in
  the metadata.
- **`src/help.ts`**: Generates the formatted help text from the metadata.

### Reflection and Decorators

- **`src/reflect.ts`**: Provides utility functions for inspecting objects (field
  names, method names, and their arguments).
- **`src/decorators.ts`**: Defines decorators (`@help`, `@alias`, `@env`, etc.)
  and manages the storage of associated metadata via `Symbol.metadata`.

### Execution

- **`src/command.ts`**: Handles the final invocation of user object methods
  based on parsed arguments.

## Metadata Mechanism

Clinfer uses two sources to understand how to map the CLI to the object:

1. **Automatic Inference**: Via `src/reflect.ts`, it lists public properties and
   methods. The extraction of function argument names is performed by string
   analysis (`toString()`) with regular expressions, allowing support for Deno,
   Node, and Bun without heavy dependencies.
2. **Decorators**: Via `src/decorators.ts`, the user can enrich the inference
   (add aliases, descriptions, etc.). Clinfer supports standard decorators (TC39
   stage 3) via `Symbol.metadata`.

Metadata is stored in a `Metadata` type object containing:

- `fields`: Descriptions of options (alias, help, type, etc.).
- `methods`: Descriptions of available commands.
- `subcommands`: List of properties identified as subcommands.

## Testing

Tests are located alongside the source code (e.g., `src/parse_args.test.ts`). To
run the tests:

```bash
deno tast test
```

## Node/NPM Version Generation

The project uses a script in `tools/` to transform Deno code into an NPM package
via `dnt`. The generated files are located in `node/`.
