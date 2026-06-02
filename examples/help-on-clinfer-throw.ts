#!/usr/bin/env node
import { clinfer } from "clinfer";
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

/*
$ ./help-on-clinfer-throw.ts --help
Usage: <script path> [Options] [--] [command [cmd args]]

Command:
  main [default]

Options:
 -h, --help  Show this help     [default: false]
      --no-throw                [default: false]

$ ./help-on-clinfer-throw.ts
An error occurred ! The help :
Usage: <script path> [Options] [--] [command [cmd args]]

Command:
  main [default]

Options:
 -h, --help  Show this help [default: false]
     --throw               [default: "true"]

The error :
error: Uncaught (in promise) Error: add --throw=false option !
      throw new Error("add --throw=false option !");
            ^
    at Tool.main (file:///tmp/clinfer/examples/help-on-clinfer-throw.ts:7:13)
*/
