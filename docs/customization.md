# Decorator @* or field _<field name>_*

Fields and methods can be extended with description, type or aliases using
decorators or `_<field name>_*` field. Decorator don't work with Javascript (not
in the language) !

In summary :

- `@help(description: string)` | `_<field>_help` : add description on
  class/methods/fields to display in the help
- `@alias(alias: string)` | `_<field>_alias` : add alias on method (`-n` for
  example)
- `@type(typeHelp: string)` | `_<field>_type` : type to display in the help
- `@negatable(help: string | boolean = true)` | `_<field>_negatable`: enable
  `--no-<option>` (`--no-dry-run` for example)
- `@defaultHelp(defaultHelp: string)` | `_<field>_default` : default to display
  in the help
- `@usage(usage: string)` | `_<field>_usage` : tool usage to display in the help
- `@hidden()` | `_<field>_hidden`: to hide in the help
- `@subcommand()` | `_<field>_subcommand` : use this field as a subcommand
- `@noCommand()` | `_<field>_no_command` : the tool have no command (only the
  main), process all positional arguments as main() args

### Help description with the @help decorator or inline help

```typescript
import { clinfer, help } from "clinfer";

@help("This tool is a little example of clinfer")
class Tool {
  retry = 2;
  webUrl = "none"; // fields are converted to kebab case as global options

  @help("skip colorize") // optional description for "no_color" field
  no_color?: string | boolean; // → --no-color

  main() {
    console.log("main command", this);
  }

  @help("create and start") // optional description for "up" command
  up() {
    console.log("up command", this);
  }

  down(force: boolean, timeout: number) {
    console.log("down command", { force, timeout }, this);
  }
}

clinfer(Tool);
```

Without decorator : optional fields `_<filed or method name>_help` are displayed
as description in the help :

```typescript
#!/usr/bin/env -S deno run -A
import { clinfer } from "clinfer";

class Tool {
  _help = "This tool is a little example of clinfer"; // optional description
  retry = 2;
  webUrl = "none"; // fields are converted to kebab case as global options
  no_color?: string | boolean; // → --no-color
  _no_color_help = "skip colorize"; // optional description for "no_color" field
  _up_help = "create and start"; // optional description for "up" command

  main() {
    console.log("main command", this);
  }

  up() {
    console.log("up command", this);
  }

  down(force: boolean, timeout: number) {
    console.log("down command", { force, timeout }, this);
  }
}

if (import.meta.main) { // if the file is imported, do not execute this block
  clinfer(Tool);
}
```

Note : on method/function, the help can be defined by the prototype :

```typescript
// if up is a method :
(Tool.prototype.up as any)._help = "create and start";
// if up is a function :
up._help = "up custom help";
```

### Alias

Alias of option can be created, with the `@alias` decorator or with
`_<field name>_alias` :

```typescript
#!/usr/bin/env -S deno run -A
import { alias, clinfer, help, type } from "clinfer";

class Tool {
  @alias("a")
  all?: boolean;
  @alias("r")
  retry = 2;
  @alias("w")
  webUrl = "none";

  @alias("nb")
  @alias("n")
  @help("n & b")
  @type("boolean")
  no_color?: string | boolean;

  main() {
    console.log("main command", this);
  }
}
```

Produce the help :

```
...
Options:
       -h, --help     Show this help [default: false]
       -a, --all
       -r, --retry                       [default: 2]
       -w, --web-url                [default: "none"]
 -n, --nb, --no-color n & b                 [boolean]
```

Short parameters can be aggregated, `-an` here :

```
$ ./alias-with-decorator.ts -an -r 8
main command Tool { all: true, retry: 8, webUrl: "none", no_color: true }
```

`-an` = `-a -n`

Example without the @alias decorator :

```typescript
class Tool {
  _all_alias = "a";
  all?: boolean;
  _retry_alias = "r";
  retry = 2;
  _webUrl_alias = "w";
  webUrl = "none";

  _no_color_alias = ["nb", "n"];
  _no_color_help = "n & b";
  _no_color_type = "boolean";
  no_color?: string | boolean;

  main() {
    console.log("main command", this);
  }
}
```

### @subcommand decorator and _*_subcommand **and $fieldName**

Use the field (class or object) as a subcommand, if the field name starts with
`$`, the field is treated as a subcommand.

Example that supports up to three levels of subcommands, with options available
at each level, like :
`./tool.ts -v=77 --token=123  get --watch=true  pod  --pod-opt 546 pod1`

[kubectl-subcommand-one-object-short.ts](examples/kubectl-subcommand-one-object-short.ts)
:

```typescript
import { clinfer } from "clinfer";

const kubectl = {
  v: 1,
  token: "",
  $get: {
    watch: false,
    $pod: {
      podOpt: 2,
      main(podName: string) {
        console.log({ kubectl, podName });
      },
    },
    $deployments: {
      deploymentsOpt: 3,
      main() {
        console.log("→ → deployments", { kubectl });
      },
    },
  },
  $explain: {
    main(val: string) {
      console.log({ kubectl, val });
    },
  },
};

clinfer(kubectl);
```

```shell-session
$ ./kubectl-subcommand-one-object-short.ts -v=77 --token=123  get --watch=true  pod  --pod-opt 546 pod1
{
  kubectl: <ref *2> {
    v: 77,
    token: "123",
    "$get": <ref *1> {
      watch: true,
      "$pod": {
        podOpt: 546,
        main: [Function: main],
      },
      "$deployments": { deploymentsOpt: 3, main: [Function: main] },
    },
    "$explain": { main: [Function: main] }
  },
  podName: "pod1"
}
```

"Class" example in [examples/git-subcommand.ts](examples/git-subcommand.ts)

```typescript
// → <Tool> [--dry-run] [ [up [--watch] <count>] | [down [--volumes] <force> <timeout>] ]
class Up {
  _clinfer_parent?: Tool;
  watch = false;
  main(_count: number) {
    console.log("Up", this);
  }
}

class Tool {
  dryRun = false;

  @subcommand()
  up = Up;

  @subcommand()
  down = {
    volumes: false,
    main(force: boolean, timeout: number) {
      console.log("Down", this);
    },
  };
}

clinfer(new Tool());
```

```shell-session
$ ./subcommand.ts --help
Usage: <script path> [Options] [--] [command [cmd args]]

Commands:
  up --help | [sub Options / cmd / args]
  down --help | [sub Options / cmd / args]

Options:
 -h, --help    Show this help [default: false]
     --dry-run                [default: false]
     --down         [default: [object Object]]

$ ./subcommand.ts down --help
Usage: <script path> [Options] [--] <force> <timeout>

Options:
 -h, --help    Show this help [default: false]
     --volumes                [default: false]
```

### @jsonConfig decorator and _json_config

Enable configCli: see "configCli" chapter below :

`enable "--config <path|json string>" to load json config, Show in the help if it's a string`

If the value is a string, it will be used in the help for "--config"
description.
