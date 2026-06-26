#!/usr/bin/env -S deno --allow-env
import clinfer from "clinfer";

class Tool {
  retry = 2; // 2 is the default value, overwrite by "--retry 8" by example
  dryRun = false; // fields are converted to kebab case as global options
  webUrl = "none"; // → --web-url

  main() { // call if : $ ./simple.ts // or if $ ./simple.ts main
    console.log("main command", this);
  }
  down(force: boolean, timeout: number) { // call if : $ ./simple.ts down true 14
    console.log("down command", { force, timeout }, this);
  }
}

clinfer(Tool, { readEnvVars: true });

/*
$ ./readEnvVars.ts
main command Tool { retry: 2, dryRun: false, webUrl: "none" }

$ retry=8 /data/Projets/Logiciels/deno/clinfer/docs/examples/readEnvVars.ts
main command Tool { retry: "8", dryRun: false, webUrl: "none" }

$ DRY_RUN=true ./readEnvVars.ts
main command Tool { retry: 2, dryRun: "true", webUrl: "none" }

$ dryRun=true /data/Projets/Logiciels/deno/clinfer/docs/examples/readEnvVars.ts
main command Tool { retry: 2, dryRun: "true", webUrl: "none" }

$ export retry=1
$ ./readEnvVars.ts
main command Tool { retry: "1", dryRun: false, webUrl: "none" }

$ ./readEnvVars.ts --help
Usage: <script path> [Options] [--] [command [cmd args]]

Commands:
  main                   [default]
  down <force> <timeout>

Options:
 -h, --help    Show this help [default: false]
     --retry                      [default: 2]
     --dry-run                [default: false]
     --web-url               [default: "none"]

Environment variables:
  RETRY or retry      to set the "retry" option
  DRY_RUN or dryRun   to set the "dryRun" option
  WEB_URL or webUrl   to set the "webUrl" option

*/
