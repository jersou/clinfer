#!/usr/bin/env node
import yargs from "https://deno.land/x/yargs@v17.7.2-deno/deno.ts";

type Options = {
  retry: number;
  dryRun: boolean;
  webUrl: string;
};

function main(argv: Options) {
  console.log({
    command: "main",
    options: { retry: argv.retry, dryRun: argv.dryRun, webUrl: argv.webUrl },
  });
}

function up(argv: Options) {
  console.log({
    command: "up",
    options: { retry: argv.retry, dryRun: argv.dryRun, webUrl: argv.webUrl },
  });
}

function down(argv: Options & { force: string; timeout: number }) {
  console.log({
    command: "down",
    options: { retry: argv.retry, dryRun: argv.dryRun, webUrl: argv.webUrl },
    cmdArgs: { force: argv.force, timeout: argv.timeout },
  });
}

yargs(Deno.args)
  .command(["main", "$0"], "", (_yargs: any) => {}, main)
  .command("up", "", (_yargs: any) => {}, up)
  .command("down <force> <timeout>", "", (_yargs: any) => {}, down)
  .option("retry", { default: 2 })
  .option("dry-run", { default: false })
  .option("web-url", { default: "none" })
  .help()
  .version(false)
  .demandCommand(1)
  .strict()
  .parse();
