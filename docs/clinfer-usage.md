## clinfer() usage

`clinfer()` function takes an object/class/module/function as input (see
[clinfer inputs](clinfer-input.md)), and an optional config, see
[ClinferRunConfig](#ClinferRunConfig) chapter bellow.

Example :

- `clinfer(Tool)`
- `clinfer(new Tool())`
- `clinfer(Tool, { noCommand: true })`
- `clinfer(import.meta)`
- `clinfer((name="none") => console.log(name))`

## clinferParse() usage

Same as `clinfer()`, but it doesn't run the command, it returns the parsing
`ClinferResult` that contains:

- obj: The input object overwritten with the data from the parsing result
- command: The command to run from the parsing result
- commandArgs: The command arguments from the parsing result
- config: The input ClinferRunConfig
- help: The generated help
- subcommand: The subcommand ClinferResult if the command is a subcommand

## Real case

- The project
  [Studio-Pack-Generator](https://github.com/jersou/studio-pack-generator) use
  clinfer and have
  [lots of CLI options](https://github.com/jersou/studio-pack-generator?tab=readme-ov-file#cli-usage)
  generated from
  [a rather understandable file](https://github.com/jersou/studio-pack-generator/blob/main/studio_pack_generator.ts)
  (in my opinion, of course). This project was likely the main motivation behind
  creating clinfer, aiming to simplify the maintenance of the SPG CLI, which was
  written twice: once for the definition and once for the implementation.
- simpler example :
  [examples/dcpps.ts](https://github.com/jersou/clinfer/tree/main/docs/examples/dcpps.ts)
- even simpler :
  [examples/dcpm.ts](https://github.com/jersou/clinfer/tree/main/docs/examples/dcpm.ts)
