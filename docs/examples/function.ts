#!/usr/bin/env node
import clinfer from "clinfer";

function down(force = false, timeout = 5) {
  console.log("down command", { force, timeout });
}

clinfer(down);
/*
$ ./examples/function.ts true 100
down command { force: true, timeout: 100 }

./examples/function.ts --help
Usage: <script path> [Options] [--] <force> <timeout>

Option:
  -h, --help Show this help [default: false]
*/
