"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";

const EXTRACTION_PROMPT = `You extract structured real-estate / vacant land listing data into JSON.
Return ONLY valid JSON (no markdown). Use null for unknown fields.
Schema keys (use these exact names):
address, city, county, state, zip, latitude, longitude, subdivision, schoolDistrict,
listingUrl, mlsNumber, price, status, source, agentName, agentContact,
lotSizeAcres, buildableAcres, zoning, topography, elevation, viewDescription, easements,
mineralRights, waterRights, hoaOrDeedRestrictions, hoaOrDeedDetails, setbackNotes,
waterSource, wellDepthFt, wellGpm, wastewater, septicNotes,
electric, distanceToNearestPoleFt, estimatedExtensionCost, gas, internet, cellSignalNotes,
roadType, roadMaintenance, drivewayInstalled, distanceFromPavedRoadMiles,
fireDeptAccessAdequate, fireDeptImprovementsNeeded, nearestFireStationMiles, fireDeptAccessRoadWidthFt,
femaFloodZone, fireRiskZone, wildfireHistoryNearby, wildfireHistoryNotes,
seismicZoneNotes, landslideRisk, radonZoneNotes, wetlandsPresent,
protectedSpeciesOrEnvRestrictions, existingStructures, structureAgeYears,
structureConditionNotes, fencing, fencingNotes, outbuildings,
annualPropertyTax, assessedValue, hoaFees, tags, notes

Enums when applicable:
status: researching|contacted_agent|scheduled_tour|toured|offer_made|under_contract|purchased|passed
topography: flat|gently_sloped|steep|mixed
mineralRights: included|excluded|unknown
waterSource: municipal|private_well_existing|well_needed|shared_well|unknown
wastewater: municipal_sewer|septic_installed|perc_test_passed|perc_test_needed|perc_test_failed|unknown
electric: on_site|available_at_road|nearby_needs_extension|unknown
gas: natural_gas|propane_tank|none
internet: fiber|cable|dsl|satellite|none_confirmed|unknown
roadType: paved|gravel|dirt|private_easement|unknown
roadMaintenance: county|hoa|private_owner|unknown
fireDeptAccessAdequate: adequate|needs_improvements|unknown
fireRiskZone: low|moderate|high|very_high|unknown
landslideRisk: low|moderate|high|unknown
tags should be a string array when present.`;

export const extractFromListing = action({
  args: {
    text: v.string(),
    listingUrl: v.optional(v.string()),
  },
  returns: v.any(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
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
