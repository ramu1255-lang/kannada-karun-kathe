import { createFileRoute } from "@tanstack/react-router";

/** Kannada text-to-speech via the Lovable AI gateway. Returns a WAV file. Key stays server-side. */
export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "Speech service not configured" }, { status: 503 });
        let text = "";
        try {
          const body = (await request.json()) as { text?: unknown };
          text = typeof body.text === "string" ? body.text.replace(/[\u0000-\u001f]/g, " ").trim().slice(0, 200) : "";
        } catch {
          /* invalid json */
        }
        // Only Kannada script (plus punctuation/spaces) is accepted, limiting misuse of this endpoint.
        if (!text || !/^[\u0C80-\u0CFF\s.,?!'"()\-–]+$/.test(text)) {
          return Response.json({ error: "Kannada text required" }, { status: 400 });
        }
        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "google/gemini-3.1-flash-tts-preview",
            contents: [{ role: "user", parts: [{ text: `Say clearly and slowly in Kannada: ${text}` }] }],
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } },
            },
            stream_format: "audio",
          }),
          signal: request.signal,
        });
        if (!upstream.ok) {
          console.error("TTS error", upstream.status, await upstream.text().catch(() => ""));
          return Response.json({ error: "Speech service unavailable" }, { status: upstream.status === 429 ? 429 : 502 });
        }
        return new Response(upstream.body, {
          headers: { "Content-Type": upstream.headers.get("Content-Type") ?? "audio/wav", "Cache-Control": "private, max-age=86400" },
        });
      },
    },
  },
});
