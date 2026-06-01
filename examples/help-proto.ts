#!/usr/bin/env node
import { clinfer } from "clinfer";

class Tool {
  main() {
    console.log("main command", this);
  }

  up() {
    console.log("up command", this);
  }
}
(Tool.prototype.up as any)._help = "up custom help";

clinfer(Tool);
/*
$ ./examples/help-proto.ts --help
Usage: <Tool file> [Options] [--] [command [cmd args]]

Commands:
  main [default]
  up   up custom help

Option:
 -h, --help Show this help [default: false]
*/
