#!/usr/bin/env -S deno run -A

import $ from "npm:dax@0.48.2";
import { clinfer } from "npm:clinfer@0.9.7";

const tool = {
  opt1: "foo",
  async main(param1) {
    const output = await $`date`.text();
    console.log(output);
  },
};

clinfer(tool);
