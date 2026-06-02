#!/usr/bin/env node
import { clinfer } from "clinfer";
// or after "deno add @jersou/clinfer" : import { clinfer } from "@jersou/clinfer";
// or for Node usage, after "npx jsr add @jersou/clinfer" (same import from "@jersou/clinfer")
// or for Node usage : import { clinfer } from "clinfer"; // after "npm install clinfer"

class Tool {
  retry = 2; // 2 is the default value, overwrite by "--retry 8" by example
  dryRun = false; // fields are converted to kebab case as global options
  webUrl = "none"; // → --web-url

  main() { // call if : $ ./simple.ts // or if $ ./simple.ts main
    console.log("main command", this);
  }

  up() { // call if : $ ./simple.ts up
    console.log("up command", this);
  }

  down(force: boolean, timeout: number) { // call if : $ ./simple.ts down true 14
    console.log("down command", { force, timeout }, this);
  }
}

clinfer(Tool);

/*
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

$ ./simple.ts
main command Tool { retry: 2, dryRun: false, webUrl: "none" }

$ ./simple.ts --dry-run --retry 8  down true 14
down command { force: "true", timeout: 14 } Tool { retry: 8, dryRun: false, webUrl: "none" }

$ ./simple.ts --retry 8 --dry-run -- down true 14
down command { force: "true", timeout: "14" } Tool { retry: 8, dryRun: false, webUrl: "none" }

$ ./simple.ts --retry 8 --dry-run true down true 14
down command { force: "true", timeout: 14 } Tool { retry: 8, dryRun: false, webUrl: "none" }
*/
