#!/usr/bin/env node
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

/*
$ ./help-on-all-throw-all.ts --help
Usage: <script path> [Options] [--] [command [cmd args]]

Command:
  main [default]

Options:
 -h, --help  Show this help [default: false]
     --throw               [default: "true"]

$ ./help-on-all-throw-all.ts
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
    at Tool.main (file:///tmp/clinfer/examples/help-on-all.ts:7:13)
*/
