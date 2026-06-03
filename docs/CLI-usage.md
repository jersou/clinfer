# Argument parsing

clinfer use [@std/cli](https://jsr.io/@std/cli/doc/parse-args), based on
[minimist](https://github.com/minimistjs/minimist).

## Kebab case or the same name

Example : `webUrl` field can be set by `--webUrl` or `--web-url`:

```shell-session
$ ./simple.ts --web-url test
main command Tool { retry: 2, dryRun: false, webUrl: "test" }

$ ./simple.ts --webUrl test
main command Tool { retry: 2, dryRun: false, webUrl: "test" }
```

## several ways to pass parameters

For example, for an option `-l, --out-limit` from a field `outLimit` with an
alias `l` :

- `-l=8`
- `-l 8`
- `-l8`
- `--out-limit 8`
- `--out-limit=8`
- `--outLimit 8`
- `--outLimit=8`

Are equivalent.

## Passing boolean

```shell-session
$ ./simple.ts
main command Tool { retry: 2, dryRun: false, webUrl: 'none' }
$ ./simple.ts --dry-run
main command Tool { retry: 2, dryRun: true, webUrl: 'none' }
$ ./simple.ts --dry-run=false
main command Tool { retry: 2, dryRun: false, webUrl: 'none' }
$ ./simple.ts --dry-run=true
main command Tool { retry: 2, dryRun: true, webUrl: 'none' }
```

## Passing arrays :

Use several times an option will fill the field if it's an array :

```typescript
class Tool {
  @alias("a")
  arr: string[] = [];
  ...
}
```

```shell-session
$ ./Tool.ts --arr=aa --arr bb -a=cc -a dd --a ee
→ arr === ["aa", "bb", "cc", "dd", "ee"]
```

## Passing objects :

Object can be deserialized :

```
--ac.bb aaa --ac.dd.ee v --ac.dd.ff w
```

will fill `ac` field with

```typescript
{ bb: "aaa", dd: { ee: "v", ff: "w" }
```

Example :

```typescript
class Tool {
  ac = {};
  ...
}
```

```shell-session
$ ./Tool.ts --ac.bb aaa --ac.dd.ee v --ac.dd.ff w
→ ac === { bb: "aaa", dd: { ee: "v", ff: "w" } })
```

## The default command

- If there is only one method/subcommand => this method is the default
- If the main method exist => main is the default
- else => no default method

```shell-session
$ ./simple.ts
main command Tool { retry: 2, dryRun: false, webUrl: 'none' }
```
