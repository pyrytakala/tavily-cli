import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const searchResource = new Command("search")
  .description("Search the web using Tavily AI search");

searchResource
  .command("query")
  .description("Execute a search query")
  .argument("<query>", "Search query to execute")
  .option("--depth <depth>", "Search depth: basic, advanced, fast, ultra-fast", "basic")
  .option("--max-results <n>", "Max results (0-20)", "5")
  .option("--topic <topic>", "Topic: general or news", "general")
  .option("--time-range <range>", "Filter: day, week, month, year")
  .option("--start-date <date>", "Results after date (YYYY-MM-DD)")
  .option("--end-date <date>", "Results before date (YYYY-MM-DD)")
  .option("--answer [type]", "Include AI answer: basic or advanced")
  .option("--raw-content [type]", "Include raw content: markdown or text")
  .option("--images", "Include images", false)
  .option("--image-descriptions", "Include image descriptions", false)
  .option("--favicon", "Include favicons", false)
  .option("--include-domains <domains...>", "Only include these domains")
  .option("--exclude-domains <domains...>", "Exclude these domains")
  .option("--country <code>", "Boost results from country")
  .option("--auto-parameters", "Auto-configure params based on query", false)
  .option("--exact-match", "Only exact phrase matches", false)
  .option("--chunks-per-source <n>", "Content chunks per source (1-3)")
  .option("--usage", "Include credit usage info", false)
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", `
Examples:
  tavily-cli search query "latest AI news"
  tavily-cli search query "climate change" --topic news --time-range week
  tavily-cli search query "rust programming" --answer advanced --max-results 10
  tavily-cli search query "site:example.com docs" --depth advanced --json`)
  .action(async (query: string, opts: Record<string, unknown>) => {
    try {
      const body: Record<string, unknown> = { query };

      if (opts.depth && opts.depth !== "basic") body.search_depth = opts.depth;
      if (opts.maxResults && opts.maxResults !== "5") body.max_results = parseInt(opts.maxResults as string);
      if (opts.topic && opts.topic !== "general") body.topic = opts.topic;
      if (opts.timeRange) body.time_range = opts.timeRange;
      if (opts.startDate) body.start_date = opts.startDate;
      if (opts.endDate) body.end_date = opts.endDate;
      if (opts.answer !== undefined) {
        body.include_answer = opts.answer === true ? true : opts.answer;
      }
      if (opts.rawContent !== undefined) {
        body.include_raw_content = opts.rawContent === true ? true : opts.rawContent;
      }
      if (opts.images) body.include_images = true;
      if (opts.imageDescriptions) body.include_image_descriptions = true;
      if (opts.favicon) body.include_favicon = true;
      if (opts.includeDomains) body.include_domains = opts.includeDomains;
      if (opts.excludeDomains) body.exclude_domains = opts.excludeDomains;
      if (opts.country) body.country = opts.country;
      if (opts.autoParameters) body.auto_parameters = true;
      if (opts.exactMatch) body.exact_match = true;
      if (opts.chunksPerSource) body.chunks_per_source = parseInt(opts.chunksPerSource as string);
      if (opts.usage) body.include_usage = true;

      const data = await client.post("/search", body) as Record<string, unknown>;
      output(data, { json: opts.json as boolean, format: opts.format as string });
    } catch (err) {
      handleError(err, opts.json as boolean);
    }
  });
