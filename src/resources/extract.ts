import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const extractResource = new Command("extract")
  .description("Extract content from URLs");

extractResource
  .command("url")
  .description("Extract content from one or more URLs")
  .argument("<urls...>", "URLs to extract content from (max 20)")
  .option("--query <query>", "User intent for reranking extracted content")
  .option("--chunks-per-source <n>", "Content chunks per source (1-5)", "3")
  .option("--depth <depth>", "Extraction depth: basic or advanced", "basic")
  .option("--images", "Include extracted images", false)
  .option("--favicon", "Include favicons", false)
  .option("--output-format <fmt>", "Content format: markdown or text", "markdown")
  .option("--timeout <seconds>", "Max seconds to wait (1-60)")
  .option("--usage", "Include credit usage info", false)
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", `
Examples:
  tavily-cli extract url https://example.com
  tavily-cli extract url https://a.com https://b.com --query "pricing info"
  tavily-cli extract url https://example.com --depth advanced --json`)
  .action(async (urls: string[], opts: Record<string, unknown>) => {
    try {
      const body: Record<string, unknown> = {
        urls: urls.length === 1 ? urls[0] : urls,
      };

      if (opts.query) body.query = opts.query;
      if (opts.chunksPerSource && opts.chunksPerSource !== "3") body.chunks_per_source = parseInt(opts.chunksPerSource as string);
      if (opts.depth && opts.depth !== "basic") body.extract_depth = opts.depth;
      if (opts.images) body.include_images = true;
      if (opts.favicon) body.include_favicon = true;
      if (opts.outputFormat && opts.outputFormat !== "markdown") body.format = opts.outputFormat;
      if (opts.timeout) body.timeout = parseFloat(opts.timeout as string);
      if (opts.usage) body.include_usage = true;

      const data = await client.post("/extract", body) as Record<string, unknown>;
      output(data, { json: opts.json as boolean, format: opts.format as string });
    } catch (err) {
      handleError(err, opts.json as boolean);
    }
  });
