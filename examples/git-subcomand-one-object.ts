#!/usr/bin/env -S deno run -A
import { clinfer } from "../mod.ts";

const kubectl = {
  v: 1,
  token: "",
  _get_subcommand: true,
  get: {
    watch: false,
    _pod_subcommand: true,
    pod: {
      podOpt: 2,
      main(podName: string) {
        // console.log({ kubectl, podName });
        console.log("→ → pod", {
          v: kubectl.v,
          token: kubectl.token,
          watch: kubectl.get.watch,
          podOpt: this.podOpt,
          podName,
        });
      },
    },
    _deployments_subcommand: true,
    deployments: {
      deploymentsOpt: 3,
      main() {
        console.log("→ → deployments", { kubectl });
      },
    },
  },
  _explain_subcommand: true,
  explain: {},
};

clinfer(kubectl);
