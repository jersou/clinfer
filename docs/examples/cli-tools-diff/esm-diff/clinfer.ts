#!/usr/bin/env node
import clinfer from "clinfer";

export let retry = 2;
export let dryRun = false;
export let webUrl = "none";

export function main() {
  console.log({
    command: "main",
    options: { retry, dryRun, webUrl },
  });
}

export function up() {
  console.log({
    command: "up",
    options: { retry, dryRun, webUrl },
  });
}

export function down(force: boolean, timeout: number) {
  console.log({
    command: "down",
    options: { retry, dryRun, webUrl },
    cmdArgs: { force, timeout },
  });
}

// clinfer setters for options, added automatically at first run
export const _set_dryRun = (v: typeof dryRun) => (dryRun = v);
export const _set_retry = (v: typeof retry) => (retry = v);
export const _set_webUrl = (v: typeof webUrl) => (webUrl = v);

clinfer(import.meta);
