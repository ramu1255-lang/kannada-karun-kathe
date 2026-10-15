import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";

import { createLovableAiGatewayProvider } from "./gateway-helpers.server.ts";

export interface TranslationResult {
  kannada: string;
  teluguPronunciation: string;
  english: string;
  example: string;
}

const SYSTEM = `You are a careful Telugu/English to Kannada translator for language learners.
Reply with ONLY a JSON object, no markdown, with exactly these keys:
- "kannada": the translation in Kannada script
- "teluguPronunciation": how to pronounce the Kannada sentence, written in Telugu script
- "english": the meaning in English
- "example": one short natural Kannada example sentence (Kannada script) using the phrase
Translate accurately; never invent meanings.`;

export const translateToKannada = createServerFn({ method: "POST" })
  .inputValidator((input: { text?: unknown }) => {
    const text = typeof input?.text === "string" ? input.text.trim().slice(0, 300) : "";
    if (!text) throw new Error("EMPTY_INPUT");
    return { text };
  })
  .handler(async ({ data }): Promise<TranslationResult> => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("AI_NOT_CONFIGURED");

    const provider = createLovableAiGatewayProvider(apiKey, undefined, {
      baseURL: process.env.LOVABLE_AI_GATEWAY_URL ?? "https://ai.gateway.lovable.dev/v1",
    });

    const { text } = await generateText({
      model: provider("openai/gpt-6-astra"),
      system: SYSTEM,
      prompt: `Translate this sentence to Kannada: ${data.text}`,
    });

    const cleaned = text.replace(/```json|```/g, "").trim();
    let parsed: TranslationResult;
    try {
      parsed = JSON.parse(cleaned) as TranslationResult;
    } catch {
      throw new Error("AI_BAD_RESPONSE");
    }
    if (!parsed.kannada || !parsed.english) throw new Error("AI_BAD_RESPONSE");
    return {
      kannada: String(parsed.kannada),
      teluguPronunciation: String(parsed.teluguPronunciation ?? ""),
      english: String(parsed.english),
      example: String(parsed.example ?? ""),
    };
  });
