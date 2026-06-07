#!/usr/bin/env node
import clinfer from "clinfer";
class Tool {
  obj?: { foo: { bar1?: number; bar2?: number }; toto?: number };
  main() {
    console.log("main command", this);
  }
}
clinfer(Tool);
/*
$ ./object.ts --obj.foo.bar1 12 --obj.foo.bar2 45  --obj.toto 89 --obj.tata 77
main command Tool { obj: { foo: { bar1: 12, bar2: 45 }, toto: 89, tata: 77 } }
*/
