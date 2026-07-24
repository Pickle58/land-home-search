"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { requireActionUser } from "./lib/auth";
import { EXTRACTION_PROMPT } from "./lib/extractionPrompt";

export const extractFromListing = action({
  args: {
    text: v.string(),
    listingUrl: v.optional(v.string()),
  },
  returns: v.any(),
  handler: async (ctx, args) => {
    await requireActionUser(ctx);
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error(
        "ANTHROPIC_API_KEY is not set on the Convex deployment. Add it with: pnpm exec convex env set ANTHROPIC_API_KEY <key>",
      );
    }

    const userContent = [
      args.listingUrl ? `Listing URL: ${args.listingUrl}` : null,
      "Listing text / paste:",
      args.text,
    ]
      .filter(Boolean)
      .join("\n\n");

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        system: EXTRACTION_PROMPT,
        messages: [{ role: "user", content: userContent }],
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("Anthropic error", body);
      throw new Error("LLM extraction failed. Check Convex logs and API key.");
    }

    const data = (await response.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const text = data.content?.find((c) => c.type === "text")?.text ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse extraction JSON from model response");
    }
    return JSON.parse(jsonMatch[0]) as Record<string, unknown>;
  },
});
