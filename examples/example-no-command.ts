#!/usr/bin/env node
import { clinfer } from "clinfer";
import { Tool } from "./example.ts";

if (import.meta.main) { // if the file is imported, do not execute this block
  clinfer(Tool, { noCommand: true });
}
