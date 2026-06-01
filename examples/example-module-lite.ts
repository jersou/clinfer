#!/usr/bin/env node
import { clinfer } from "clinfer";

export function up() {
  private_function();
  console.log("up command");
}

function private_function() {
  console.log("private_function");
}

export function down(force = false, timeout = 5) {
  console.log("down command", { force, timeout });
}

export const main = () => console.log("main");

clinfer(import.meta);
/*
$ ./examples/example-module-lite.ts --opt bar down true 100
down command { force: true, timeout: 100 }

./examples/example-module-lite.ts --help
Usage: <Object file> [Options] [--] [command [cmd args]]

Commands:
  down <force> <timeout>
  main                   [default]
  up

Option:
  -h, --help Show this help [default: false]
*/
