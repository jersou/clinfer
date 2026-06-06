#!/usr/bin/env node

import clinfer from "clinfer";

const tool = {
  retry: 2,
  main(name = "none") {
    console.log(`main command name=${name}`);
    console.log(`retry=${this.retry}`);
  },
};

clinfer(tool);
