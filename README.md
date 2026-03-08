# tavily-cli

Unofficial CLI for the [Tavily](https://tavily.com) AI search API. Search, extract, crawl, and map the web. Made with [api2cli.dev](https://api2cli.dev).

> **Note:** This is a community-maintained project and is not officially affiliated with or endorsed by Tavily.

## Install

```bash
npm i -g tavily-cli
# or
npx tavily-cli --help
```

## Setup

```bash
tavily-cli auth set "tvly-YOUR_API_KEY"
tavily-cli auth test
```

Get your API key at [tavily.com](https://tavily.com).

## Usage

### Search the web

```bash
tavily-cli search query "latest AI news"
tavily-cli search query "climate change" --topic news --time-range week
tavily-cli search query "rust programming" --answer advanced --max-results 10
tavily-cli search query "pricing" --depth advanced --include-domains example.com
```

### Extract content from URLs

```bash
tavily-cli extract url https://example.com
tavily-cli extract url https://a.com https://b.com --query "pricing info"
tavily-cli extract url https://example.com --depth advanced --json
```

### Crawl websites

```bash
tavily-cli crawl url https://docs.example.com
tavily-cli crawl url https://example.com --max-depth 3 --limit 100
tavily-cli crawl url https://example.com --instructions "Find pricing pages" --json
```

### Map website structure

```bash
tavily-cli map url https://docs.example.com
tavily-cli map url https://example.com --max-depth 3 --limit 100 --json
```

## Global Flags

All commands support: `--json`, `--format <fmt>` (text, json, csv, yaml), `--verbose`, `--no-color`, `--no-header`

## Development

```bash
git clone https://github.com/pyrytakala/tavily-cli.git
cd tavily-cli
bun install
bun run dev -- search query "test"
```
