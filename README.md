# tavily-cli

CLI for the tavily API. Made with [api2cli.dev](https://api2cli.dev).

## Install

```bash
npx api2cli install <user>/tavily-cli
```

This clones the repo, builds the CLI, links it to your PATH, and installs the AgentSkill to your coding agents.

## Install AgentSkill only

```bash
npx skills add <user>/tavily-cli
```

## Usage

```bash
tavily-cli auth set "your-token"
tavily-cli auth test
tavily-cli --help
```

## Resources

Run `tavily-cli --help` to see available resources.

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`
