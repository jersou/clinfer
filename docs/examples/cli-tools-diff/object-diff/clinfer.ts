#!/usr/bin/env node
import clinfer from "clinfer";

const tool = {
  retry: 2,
  dryRun: false,
  webUrl: "none",
  main() {
    console.log({
      command: "main",
      options: { retry: tool.retry, dryRun: tool.dryRun, webUrl: tool.webUrl },
    });
  },
  up() {
    console.log({
      command: "up",
      options: { retry: tool.retry, dryRun: tool.dryRun, webUrl: tool.webUrl },
    });
  },
  down(force: boolean, timeout: number) {
    console.log({
      command: "down",
      options: { retry: tool.retry, dryRun: tool.dryRun, webUrl: tool.webUrl },
      cmdArgs: { force, timeout },
    });
  },
};

clinfer(tool);
