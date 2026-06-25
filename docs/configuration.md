# ClinferRunConfig

`clinfer(Tool, < optional ClinferRunConfig > )`

```typescript
type ClinferRunConfig = {
  args?: string[]; // default : Deno.args or process.argv.slice(2)
  dontPrintResult?: boolean; // default false : false, print the command return
  noCommand?: boolean; // the tool has no command (only the main), process all positional arguments to the default command
  printHelpOnError?: boolean; // print the help if an error is thrown and then re-throw the error
  mainFile?: string; // allows to change the name of the file in the help, instead of the default <{Class name} file>
  meta?: ImportMeta; // import.meta to use : don't run if the file is imported, and use the basename of import.meta.url in the help
  configCli?: boolean | string; // enable "--config <path|json string>" to load json config, Show in the help if it's a string
  dontConvertCmdArgs?: boolean; // don't convert "true"/"false" to true/false in command arguments, and not to number after --
  allowOptionAfterCmd?: boolean; // If true, options appearing after a command can be parsed as options instead of command arguments. default: false
  readEnvVars?: boolean; // If true, checks environment variables for each option (same name or SCREAMING_CASE)
};
```

## dontPrintResult

If the method run by `clinfer` returns a value != undefined, it will be printed
in stdout. If it's a promise, the result of the promise will be awaited.

This behavior can be disabled with the config :
`clinfer(Tool, { dontPrintResult: true })`

## noCommand

No command in the command line → all positional argument are used as arguments
of the default command.

**If the tool has only one command, noCommand is forced.**

`clinfer(Tool, { noCommand: true });` → `./no-command.ts --help` give :

```
This tool is a "no-command" example of clinfer usage

Usage: <script path> [Options] [--] [args]

Options:
  --retry=<RETRY>        (default "2")
  --web-url=<WEB_URL>    web URL ... (default "none")
  --no-color=<NO_COLOR>  skip colorize
  --help                 Show this help
```

## Print the help on error

If printHelpOnError is enabled, the help is printed if any error is thrown
during the command execution. Otherwise, the help is printed only for errors
that have `{ cause: { clinfer: true } }`.

It's useful if a required option is missing, for example.

```typescript
import clinfer from "clinfer";
export class Tool {
  throw = "true";
  main() {
    if (this.throw === "true") {
      throw new Error("add --throw=false option !");
    }
    console.log("OK !");
  }
}
clinfer(Tool, { printHelpOnError: true });
```

To print help on specific error only, without `printHelpOnError=true`, use
`{ cause: { clinfer: true } }` :

```typescript
import clinfer from "clinfer";
export class Tool {
  noThrow = false;

  main() {
    if (!this.noThrow) {
      throw new Error("add --no-throw option !", { cause: { clinfer: true } });
    }
    console.log("OK !");
  }
}
clinfer(Tool);
```

## mainFile

Allows to change the name of the file in the help, instead of the default for
example `<script path>`.

```typescript
clinfer(Tool, { mainFile: "my-tool" });
```

...will change the usage line in the help :

```
Usage: my-tool [Options] [--] [command [cmd args]]
```

## meta

Use meta to avoid the manual `import.meta.main` check :

```typescript
if (import.meta.main) { // if the file is imported, do not execute this block
  clinfer(Tool);
}
```

is equivalent to :

```typescript
clinfer(Tool, { meta: import.meta });
```

The basename of `import.meta.url` will be used in the generated help, as
`mainFile`.

This feature doesn't work with Node (no import.meta.main).

## configCli : load a JSON config with `--config <path | or json string>`

If `configCli === true` in the ClinferRunConfig or `@jsonConfig` is used or
`_json_config = true`

```shell-session
$ cat ./load-config.ts
...
clinfer(Tool, { configCli: true });

$ ./load-config.ts --help
...
     --config  Use this JSON file or string to read the options [string]
...

$ ./load-config.ts  down
down command { force: undefined, timeout: undefined } Tool { retry: 2, dryRun: false, webUrl: 'none', config: undefined }

$ cat load-config.json
{ "retry": 44, "dryRun": true, "webUrl": "yyy" }

$ ./load-config.ts --retry 88 --config ./load-config.json down
down command { force: undefined, timeout: undefined } Tool {
  retry: 88,
  dryRun: true,
  webUrl: 'yyy',
  config: './load-config.json'
}
```

## dontConvertCmdArgs

If `--` is used and `dontConvertCmdArgs=true`, all command arguments will be
strings.

```shell-session
# with dontConvertCmdArgs: true
$ ./Tool.ts -- main 123 true foo
 → command = main
 → commandArgs = ["123", "true", "foo"]);

# with dontConvertCmdArgs: false (the default)
$ ./Tool.ts -- main 123 true foo
 → command = main
 → commandArgs = 123, true, "foo"]);
```

## allowOptionAfterCmd

If true, options appearing after a command can be parsed as options instead of
command arguments, if it begins with `-` :

```shell-session
# allowOptionAfterCmd = false (the default)
$ ./Tool.ts --opt=123 up true foo
 → command = up
 → options: opt=123
 → commandArgs = [true, "foo"]);
$ ./Tool.ts up --opt=123 true foo
 → command = up
 → options: opt=init
 → commandArgs = ["--opt=123", true, "foo"]);
# ----------------------------------------
# allowOptionAfterCmd = true
$ ./Tool.ts --opt=123 up true foo
 → command = up
 → options: opt=123
 → commandArgs = [true, "foo"]);

$ ./Tool.ts up --opt=123 true foo
 → command = up
 → options: opt=123
 → commandArgs = [true, "foo"]);
```

⚠️ Warning : When using `allowOptionAfterCmd = true` with subcommands, options
are treated as top-level commands. Consequently, subcommands cannot have their
own options.

## readEnvVars

If `true`, checks environment variables for each option using several formats:

- Exact property name (e.g. `myOption`)
- SCREAMING_CASE (e.g. `MY_OPTION`)

This is performed before parsing the args. Command line arguments always have
priority over environment variables.

You can also enable environment variable reading for specific options using the
`@env()` decorator or `_env_foo` naming convention, even if `readEnvVars` is not
enabled globally (see [customization.md](customization.md)).
