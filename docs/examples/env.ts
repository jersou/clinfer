#!/usr/bin/env -S deno --allow-env
import { clinfer, env } from "clinfer";

class Tool {
  @env("DESKTOP_SESSION")
  deskSession = "";

  @env()
  display = "";

  main() {
    console.log(`deskSession=${this.deskSession} display=${this.display}`);
  }
}

clinfer(Tool);

/*
$ ./env.ts
deskSession=mate display=:0

$ DISPLAY=none DESKTOP_SESSION=null ./env.ts
deskSession=null display=none

$ export DESKTOP_SESSION=gnome
$ ./env.ts
deskSession=gnome display=:0

*/
