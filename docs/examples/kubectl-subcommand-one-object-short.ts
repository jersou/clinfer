#!/usr/bin/env node
import { clinfer } from "clinfer";

const kubectl = {
  v: 1,
  token: "",
  $get: {
    watch: false,
    $pod: {
      podOpt: 2,
      main(podName: string) {
        console.log({ kubectl, podName });
      },
    },
    $deployments: {
      deploymentsOpt: 3,
      main() {
        console.log("→ → deployments", { kubectl });
      },
    },
  },
  $explain: {
    main(val: string) {
      console.log({ kubectl, val });
    },
  },
};

clinfer(kubectl);
/*
$ ./kubectl-subcommand-one-object.ts --help
Usage: <script path> [Options] [--] [command [cmd args]]

Commands:
  get --help | [sub Options / cmd / args]
  explain --help | [sub Options / cmd / args]

Options:
 -h, --help  Show this help [default: false]
     --v                        [default: 1]
     --token                   [default: ""]

$ ./kubectl-subcommand-one-object.ts get --help

Usage: <script path> [Options] [--] [command [cmd args]]

Commands:
  pod --help | [sub Options / cmd / args]
  deployments --help | [sub Options / cmd / args]

Options:
 -h, --help  Show this help [default: false]
     --watch                [default: false]

./kubectl-subcommand-one-object.ts get pod --help
Usage: <script path> [Options] [--] <podName>

Options:
 -h, --help    Show this help [default: false]
     --pod-opt                    [default: 2]

$ ./kubectl-subcommand-one-object-short.ts -v=77 --token=123  get --watch=true  pod  --pod-opt 546 pod1
{
  kubectl: <ref *2> {
    v: 77,
    token: "123",
    "$get": <ref *1> {
      watch: true,
      "$pod": {
        podOpt: 546,
        main: [Function: main],
        _clinfer_parent: [Circular *1]
      },
      "$deployments": { deploymentsOpt: 3, main: [Function: main] },
      _clinfer_parent: [Circular *2]
    },
    "$explain": { main: [Function: main] }
  },
  podName: "pod1"
}
*/
