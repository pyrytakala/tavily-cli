---
name: tavily-cli
description: "Manage tavily via CLI - search, extract, crawl, map. Use when user mentions 'tavily' or wants to interact with the tavily API."
category: search
---

# tavily-cli

## Setup

If `tavily-cli` is not found, install and build it:
```bash
bun --version || curl -fsSL https://bun.sh/install | bash
npx api2cli bundle tavily
npx api2cli link tavily
```

`api2cli link` adds `~/.local/bin` to PATH automatically. The CLI is available in the next command.

Always use `--json` flag when calling commands programmatically.

## Authentication

```bash
tavily-cli auth set "your-token"
tavily-cli auth test
```

## Resources

### search - Search the web using Tavily AI search
```bash
tavily-cli search query "latest AI news"
tavily-cli search query "climate change" --topic news --time-range week
tavily-cli search query "rust programming" --answer advanced --max-results 10 --json
tavily-cli search query "pricing" --depth advanced --include-domains example.com
```

### extract - Extract content from URLs
```bash
tavily-cli extract url https://example.com
tavily-cli extract url https://a.com https://b.com --query "pricing info"
tavily-cli extract url https://example.com --depth advanced --json
```

### crawl - Crawl websites and extract content
```bash
tavily-cli crawl url https://docs.example.com
tavily-cli crawl url https://example.com --max-depth 3 --limit 100
tavily-cli crawl url https://example.com --instructions "Find pricing pages" --json
```

### map - Map website structure and discover URLs
```bash
tavily-cli map url https://docs.example.com
tavily-cli map url https://example.com --max-depth 3 --limit 100 --json
```

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`
