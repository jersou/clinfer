#!/usr/bin/env node
import clinfer from "clinfer";
function main(name = "none", retry = 2) {
  console.log("→ main command", name, retry);
}
clinfer(main);
