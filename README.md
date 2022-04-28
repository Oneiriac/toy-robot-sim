Toy Robot Simulator (Node.js + TypeScript)
=================

CLI app written in Node.js + TypeScript, bootstrapped with the [oclif](https://oclif.io) framework.

# Usage
<!-- usage -->
```sh-session
$ npm install -g toy-robot-sim
$ robotsim COMMAND
running command...
$ robotsim (--version)
toy-robot-sim/0.1.0 darwin-x64 node-v12.22.1
$ robotsim --help [COMMAND]
USAGE
  $ robotsim COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`robotsim help [COMMAND]`](#robotsim-help-command)
* [`robotsim run [FILEPATH]`](#robotsim-run-filepath)

## `robotsim help [COMMAND]`

Display help for robotsim.

```
USAGE
  $ robotsim help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for robotsim.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `robotsim run [FILEPATH]`

Run robot simulator with input from either stdin or a text file

```
USAGE
  $ robotsim run [FILEPATH] [-s]

ARGUMENTS
  FILEPATH  input file to parse (if --stdin / -s is not provided)

FLAGS
  -s, --stdin  read stdin

DESCRIPTION
  Run robot simulator with input from either stdin or a text file

EXAMPLES
  $ echo "PLACE 0,1,NORTH\nREPORT" | robotsim run -s
  0,1,NORTH
  # input.txt contents
  # PLACE 0,0,NORTH
  # MOVE
  # REPORT
  $ robotsim run input.txt
  0,1,NORTH
```

_See code: [dist/commands/run.ts](https://github.com/Oneiriac/toy-robot-sim/blob/v0.1.0/dist/commands/run.ts)_
<!-- commandsstop -->
