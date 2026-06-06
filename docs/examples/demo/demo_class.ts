#!/usr/bin/env node
import clinfer from "clinfer";
class Tool {
  _help = "Tool usage description here"; // ---- optional
  retry = 2;
  _retry_help = "number of retries"; // optional
  _retry_alias = "r"; // optional
  dryRun = true;
  _dryRun_help = "run with no changes"; // optional
  main(name: string) {
    console.log("main command", name, this.retry);
    this.up();
  }
  up() {
    console.log("up command");
  }
  _down_help = "down cmd description";
  down(force: boolean, timeout: number) {
    console.log("down params", { force, timeout });
    const { retry, dryRun } = this;
    console.log("options", { retry, dryRun });
  }
}
clinfer(Tool);
