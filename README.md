oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g toy-robot-sim
$ robotsim COMMAND
running command...
$ robotsim (--version)
toy-robot-sim/0.0.0 darwin-x64 node-v16.14.2
$ robotsim --help [COMMAND]
USAGE
  $ robotsim COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`robotsim hello PERSON`](#robotsim-hello-person)
* [`robotsim hello world`](#robotsim-hello-world)
* [`robotsim help [COMMAND]`](#robotsim-help-command)
* [`robotsim plugins`](#robotsim-plugins)
* [`robotsim plugins:install PLUGIN...`](#robotsim-pluginsinstall-plugin)
* [`robotsim plugins:inspect PLUGIN...`](#robotsim-pluginsinspect-plugin)
* [`robotsim plugins:install PLUGIN...`](#robotsim-pluginsinstall-plugin-1)
* [`robotsim plugins:link PLUGIN`](#robotsim-pluginslink-plugin)
* [`robotsim plugins:uninstall PLUGIN...`](#robotsim-pluginsuninstall-plugin)
* [`robotsim plugins:uninstall PLUGIN...`](#robotsim-pluginsuninstall-plugin-1)
* [`robotsim plugins:uninstall PLUGIN...`](#robotsim-pluginsuninstall-plugin-2)
* [`robotsim plugins update`](#robotsim-plugins-update)

## `robotsim hello PERSON`

Say hello

```
USAGE
  $ robotsim hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/Oneiriac/toy-robot-sim/blob/v0.0.0/dist/commands/hello/index.ts)_

## `robotsim hello world`

Say hello world

```
USAGE
  $ robotsim hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `robotsim plugins`

List installed plugins.

```
USAGE
  $ robotsim plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ robotsim plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `robotsim plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ robotsim plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ robotsim plugins add

EXAMPLES
  $ robotsim plugins:install myplugin 

  $ robotsim plugins:install https://github.com/someuser/someplugin

  $ robotsim plugins:install someuser/someplugin
```

## `robotsim plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ robotsim plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ robotsim plugins:inspect myplugin
```

## `robotsim plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ robotsim plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ robotsim plugins add

EXAMPLES
  $ robotsim plugins:install myplugin 

  $ robotsim plugins:install https://github.com/someuser/someplugin

  $ robotsim plugins:install someuser/someplugin
```

## `robotsim plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ robotsim plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ robotsim plugins:link myplugin
```

## `robotsim plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ robotsim plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ robotsim plugins unlink
  $ robotsim plugins remove
```

## `robotsim plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ robotsim plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ robotsim plugins unlink
  $ robotsim plugins remove
```

## `robotsim plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ robotsim plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ robotsim plugins unlink
  $ robotsim plugins remove
```

## `robotsim plugins update`

Update installed plugins.

```
USAGE
  $ robotsim plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
