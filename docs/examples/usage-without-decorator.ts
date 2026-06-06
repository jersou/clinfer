#!/usr/bin/env node
import clinfer from "clinfer";

class Tool {
  _usage = "new usage of Tool";
  main() {
    console.log("main command", this);
  }
}

clinfer(Tool);
