#!/usr/bin/env node
import { clinfer } from "clinfer";
const tool = {
  _help: "Tool usage description here", // optional
  retry: 2,
  _retry_help: "number of retries", // optional
  _retry_alias: "r", // optional
  dryRun: true,
  _dryRun_help: "perform a trial run with no changes made", // optional
  main(name: string) {
    console.log("main command", name, this.retry);
    this.up();
  },
  up() {
    console.log("up command");
  },
  down(force: boolean, timeout: number) {
    const { retry, dryRun } = this;
    console.log("down command", { force, timeout, retry, dryRun });
  },
  _down_help: "down cmd description",
};
clinfer(tool);
