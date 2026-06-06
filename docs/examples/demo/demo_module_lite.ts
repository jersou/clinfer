#!/usr/bin/env node
import clinfer from "clinfer";
export let retry = 2;
export function main(name: string) {
  console.log("main command", name, retry);
}
// setters for options, added automatically
export const _set_retry = (v) => (retry = v);
clinfer(import.meta);
