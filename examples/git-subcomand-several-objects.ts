#!/usr/bin/env -S deno run -A
import { clinfer } from "../mod.ts";

const pod = {
  podOpt: 2,
  _no_command: true,
  main(podName: string) {
    console.log("→ → pod", {
      token: kubectl.token,
      watch: get.watch,
      podOpt: this.podOpt,
    });
  },
};

const deployments = {
  deploymentsOpt: 3,
  _no_command: true,
  main() {
    console.log("→ → deployments", { kubectl });
  },
};

const get = {
  watch: false,
  pod,
  deployments,
  _pod_subcommand: true,
  _deployments_subcommand: true,
  main() {
    console.log("→ → get", { kubectl });
  },
};
const $explain = {};

const kubectl = {
  v: 1,
  token: "",
  _get_subcommand: true,
  get,
  $explain,
  _$explain_subcommand: true,
  main() {
    console.log("→ → kubectl", { kubectl });
  },
};

clinfer(kubectl);
