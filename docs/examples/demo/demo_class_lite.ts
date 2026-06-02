#!/usr/bin/env node

import { clinfer } from "clinfer";

class Tool {
  retry = 2;
  dryRun = true;

  main(name: string) {
    console.log("main command", name, this.retry);
    this.up();
  }
  up() {
    console.log("up command");
  }
  down(force: boolean, timeout: number) {
    console.log("down parameters", { force, timeout });
    const { retry, dryRun } = this;
    console.log("options", { retry, dryRun });
  }
}

clinfer(Tool);
