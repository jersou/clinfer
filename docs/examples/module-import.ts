#!/usr/bin/env node
import clinfer from "clinfer";
import * as tool from "./module.ts";

clinfer(tool);
/*
$ ./examples/module-import.ts --help
Usage: <Object file> [Options] [--] [command [cmd args]]

Commands:
  down <force> <timeout> down custom help
  main                   [default]
  up

Options:
 -h, --help Show this help [default: false]
     --opt                 [default: "foo"]
*/
