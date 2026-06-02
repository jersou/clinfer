#!/usr/bin/env node
import { clinfer } from "clinfer";

export class Tool {
  retry = 2;
  _help = "This tool is a full example of clinfer usage";
  no_color?: string | boolean;
  _no_color_help = "skip colorize";

  main(...services: string[]) {
    console.log("main command", this, { services });
  }
}

if (import.meta.main) { // if the file is imported, do not execute this block
  clinfer(Tool, { noCommand: true });
}
