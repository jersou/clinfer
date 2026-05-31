#!/usr/bin/env -S deno run -A
import { clinfer } from "../../../mod.ts";

const tool = {
  retry: 2,
  dryRun: false,
  webUrl: "none",
  main() {
    console.log({
      command: "main",
      options: { retry: tool.retry, dryRun: tool.dryRun, webUrl: tool.webUrl },
    });
  },
  up() {
    console.log({
      command: "up",
      options: { retry: tool.retry, dryRun: tool.dryRun, webUrl: tool.webUrl },
    });
  },
  down(force: boolean, timeout: number) {
    console.log({
      command: "down",
      options: { retry: tool.retry, dryRun: tool.dryRun, webUrl: tool.webUrl },
      cmdArgs: { force, timeout },
    });
  },
};

clinfer(tool);

/*
$ ./clinfer.ts --help
Usage: <script path> [Options] [--] [command [command args]]

Commands:
  main                   [default]
  up
  down <force> <timeout>

Options:
 -h, --help    Show this help [default: false]
     --retry                      [default: 2]
     --dry-run                [default: false]
     --web-url               [default: "none"]

$ ./clinfer.ts
{
  command: "main",
  options: { retry: 2, dryRun: false, webUrl: "none" }
}

$ ./clinfer.ts --retry 8 --dry-run --web-url=http
{
  command: "main",
  options: { retry: 8, dryRun: true, webUrl: "http" }
}

$ ./clinfer.ts down true 40
{
  command: "down",
  options: { retry: 2, dryRun: false, webUrl: "none" },
  cmdArgs: { force: true, timeout: 40 }
}

$ ./clinfer.ts --retry 8 --dry-run --web-url=http down true 40
{
  command: "down",
  options: { retry: 8, dryRun: true, webUrl: "http" },
  cmdArgs: { force: true, timeout: 40 }
}


$ ./clinfer.ts --unk
An error occurred ! The help :
...
The error :
error: Uncaught (in promise) Error: The option "unk" doesn't exist


$ ./clinfer.ts unk
An error occurred ! The help :
...
The error :
error: Uncaught (in promise) Error: The command "unk" doesn't exist
...

 */
