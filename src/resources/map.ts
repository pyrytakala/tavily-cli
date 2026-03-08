import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const mapResource = new Command("map")
  .description("Map website structure and discover URLs");

mapResource
  .command("url")
  .description("Map a website starting from a root URL")
  .argument("<url>", "Root URL to begin the mapping")
  .option("--instructions <text>", "Natural language guidance for crawler")
  .option("--max-depth <n>", "How far from base URL to explore (1-5)", "1")
  .option("--max-breadth <n>", "Links to follow per page level (1-500)", "20")
  .option("--limit <n>", "Total links to process", "50")
  .option("--select-paths <patterns...>", "Regex patterns targeting URL paths")
  .option("--select-domains <patterns...>", "Regex patterns for domains")
  .option("--exclude-paths <patterns...>", "Regex patterns to exclude paths")
  .option("--exclude-domains <patterns...>", "Regex patterns to exclude domains")
  .option("--no-external", "Exclude external domain links")
  .option("--timeout <seconds>", "Max seconds to wait (10-150)", "150")
  .option("--usage", "Include credit usage info", false)
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", `
Examples:
  tavily-cli map url https://docs.example.com
  tavily-cli map url https://example.com --max-depth 3 --limit 100
  tavily-cli map url https://example.com --select-paths "/blog/.*" --json`)
  .action(async (url: string, opts: Record<string, unknown>) => {
    try {
      const body: Record<string, unknown> = { url };

      if (opts.instructions) body.instructions = opts.instructions;
      if (opts.maxDepth && opts.maxDepth !== "1") body.max_depth = parseInt(opts.maxDepth as string);
      if (opts.maxBreadth && opts.maxBreadth !== "20") body.max_breadth = parseInt(opts.maxBreadth as string);
      if (opts.limit && opts.limit !== "50") body.limit = parseInt(opts.limit as string);
      if (opts.selectPaths) body.select_paths = opts.selectPaths;
      if (opts.selectDomains) body.select_domains = opts.selectDomains;
      if (opts.excludePaths) body.exclude_paths = opts.excludePaths;
      if (opts.excludeDomains) body.exclude_domains = opts.excludeDomains;
      if (opts.external === false) body.allow_external = false;
      if (opts.timeout && opts.timeout !== "150") body.timeout = parseInt(opts.timeout as string);
      if (opts.usage) body.include_usage = true;

      const data = await client.post("/map", body) as Record<string, unknown>;
      output(data, { json: opts.json as boolean, format: opts.format as string });
    } catch (err) {
      handleError(err, opts.json as boolean);
    }
  });
