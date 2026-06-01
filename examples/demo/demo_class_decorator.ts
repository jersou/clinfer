#!/usr/bin/env -S deno run -A
import { alias, clinfer, help } from "clinfer";
@help("Tool usage description here") // optional
class Tool {
  @help("number of retries") // optional
  @alias("r") // optional
  retry = 2;
  @help("perform a trial run with no changes made") // optional
  dryRun = true;
  main(name: string) {
    console.log("main command", name, this.retry);
    this.up();
  }
  up() {
    console.log("up command");
  }
  @help("down cmd description") // optional
  down(force: boolean, timeout: number) {
    const { retry, dryRun } = this;
    console.log("down command", { force, timeout, retry, dryRun });
  }
}
clinfer(Tool);
