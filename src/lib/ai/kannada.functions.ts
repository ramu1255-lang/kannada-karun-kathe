import { createServerFn } from "@tanstack/react-start";

export type Direction = "te-kn" | "kn-te";

export interface TranslationResult {
  direction: Direction;
  /** Translation in the target script (Kannada for te-kn, Telugu for kn-te). */
  translation: string;
  /** The Kannada sentence (input or output). */
  kannada: string;
  /** English-letter transliteration of the Kannada sentence. */
  transliteration: string;
  /** How to say the Kannada sentence, written in Telugu script. */
  teluguPronunciation: string;
  english: string;
  exampleKannada: string;
  exampleMeaning: string;
}

export interface PracticeFeedback {
  correct: boolean;
  feedbackTelugu: string;
  feedbackEnglish: string;
  corrected: string;
  alternative: string;
}

type AiError = { error: string };

/** Named fields keep untrusted AI values unknown until each handler validates them. */
type AiJsonResponse = Partial<
  Record<keyof Omit<TranslationResult, "direction"> | keyof PracticeFeedback | "error", unknown>
>;

async function askJson(system: string, prompt: string): Promise<AiJsonResponse> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return { error: "AI service is not configured on the server." };
  const { createOpenAI } = await import("@ai-sdk/openai");
  const { streamText } = await import("ai");
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  try {
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system,
      prompt,
      maxRetries: 0,
      providerOptions: {
        openai: { store: false, forceReasoning: true, reasoningEffort: "low", include: ["reasoning.encrypted_content"] },
      },
    });
    const text = await result.text;
    const m = text.match(/\{[\s\S]*\}/);
    if (!m) return { error: "The AI returned an unreadable answer. Please retry." };
    return JSON.parse(m[0]) as AiJsonResponse;
  } catch (e) {
    const status = (e as { statusCode?: number }).statusCode;
    console.error("AI gateway error", status, e);
    if (status === 429) return { error: "Too many requests right now. Wait a moment and retry." };
    if (status === 402) return { error: "AI credits are used up for this workspace." };
    return { error: "The AI service could not respond. Please retry." };
  }
}

const s = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 600) : "");
const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "";

export const translateText = createServerFn({ method: "POST" })
  .inputValidator((input: { text?: unknown; direction?: unknown }) => {
    const text = clean(input?.text, 300);
    if (!text) throw new Error("Please type a sentence first.");
    const direction: Direction = input?.direction === "kn-te" ? "kn-te" : "te-kn";
    return { text, direction };
  })
  .handler(async ({ data }): Promise<TranslationResult | AiError> => {
    const toKn = data.direction === "te-kn";
    const system = `You are an accurate translator for learners. ${
      toKn ? "Translate Telugu or English input into natural spoken Kannada." : "Translate Kannada input into natural Telugu."
    }
Reply with ONLY a JSON object with keys:
"translation": ${toKn ? "the Kannada translation in Kannada script" : "the Telugu translation in Telugu script"},
"kannada": the Kannada sentence in Kannada script,
"transliteration": the Kannada sentence in simple English letters,
"teluguPronunciation": the Kannada sentence written phonetically in Telugu script,
"english": the English meaning,
"exampleKannada": one short different natural Kannada example sentence using the same key phrase,
"exampleMeaning": its meaning in English.
Never invent meanings. If input is not meaningful, set translation to "" .`;
    const r = await askJson(system, data.text);
    if (typeof r.error === "string" && Object.keys(r).length === 1) return { error: r.error };
    const out: TranslationResult = {
      direction: data.direction,
      translation: s(r.translation),
      kannada: s(r.kannada) || (toKn ? s(r.translation) : data.text),
      transliteration: s(r.transliteration),
      teluguPronunciation: s(r.teluguPronunciation),
      english: s(r.english),
      exampleKannada: s(r.exampleKannada),
      exampleMeaning: s(r.exampleMeaning),
    };
    if (!out.translation) return { error: "The AI could not translate that text. Try a clearer sentence." };
    return out;
  });

export const checkPracticeAnswer = createServerFn({ method: "POST" })
  .inputValidator((input: { situation?: unknown; prompt?: unknown; expected?: unknown; answer?: unknown }) => {
    const answer = clean(input?.answer, 200);
    if (!answer) throw new Error("Please type your reply first.");
    return {
      situation: clean(input?.situation, 200),
      prompt: clean(input?.prompt, 200),
      expected: clean(input?.expected, 200),
      answer,
    };
  })
  .handler(async ({ data }): Promise<PracticeFeedback | AiError> => {
    const system = `You are a friendly Kannada tutor for Telugu speakers. The learner replies in Kannada (script or English letters).
Judge if the reply is understandable and fits the situation (small spelling slips are fine).
Reply with ONLY JSON: {"correct": boolean, "feedbackTelugu": short explanation in Telugu, "feedbackEnglish": same in English,
"corrected": a corrected natural Kannada reply in Kannada script, "alternative": another natural Kannada way to say it}.`;
    const r = await askJson(
      system,
      `Situation: ${data.situation}\nOther person said: ${data.prompt}\nA good model reply: ${data.expected}\nLearner reply: ${data.answer}`,
    );
    if (typeof r.error === "string" && Object.keys(r).length === 1) return { error: r.error };
    return {
      correct: r.correct === true,
      feedbackTelugu: s(r.feedbackTelugu),
      feedbackEnglish: s(r.feedbackEnglish),
      corrected: s(r.corrected),
      alternative: s(r.alternative),
    };
  });
