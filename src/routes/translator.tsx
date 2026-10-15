import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Eraser, Heart, Languages, Loader2, RefreshCw, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ListenButton } from "@/components/ListenButton";
import { translateToKannada, type TranslationResult } from "@/lib/ai/translate.server";
import { useGame } from "@/lib/game";

export const Route = createFileRoute("/translator")({
  head: () => ({
    meta: [
      { title: "AI Translator — Kannada for Everyone" },
      { name: "description", content: "Translate Telugu or English sentences into Kannada with pronunciation guidance." },
      { property: "og:title", content: "AI Telugu to Kannada translator" },
      { property: "og:description", content: "Type in Telugu or English, get Kannada with pronunciation help." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TranslatorPage,
});

interface HistoryItem extends TranslationResult {
  id: string;
  source: string;
}

const EXAMPLES = [
  "నాకు ఒక కప్పు కాఫీ కావాలి",
  "బస్ స్టాప్ ఎక్కడ ఉంది?",
  "How much does this cost?",
];

function TranslatorPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { earn } = useGame();

  async function translate(text: string) {
    const trimmed = text.trim();
    if (!trimmed || status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const r = await translateToKannada({ data: { text: trimmed } });
      setResult(r);
      setHistory((h) => [{ ...r, id: `${Date.now()}`, source: trimmed }, ...h].slice(0, 20));
      earn(`translate:${trimmed.toLowerCase()}`, 5);
      setStatus("idle");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      setErrorMsg(
        msg.includes("AI_NOT_CONFIGURED")
          ? "The AI service is not configured yet. Add the AI key on the server to enable real translations."
          : "Translation failed. Please check your connection and try again.",
      );
      setStatus("error");
    }
  }

  function copy(text: string) {
    void navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Copy failed — select the text manually"));
  }

  return (
    <div className="mx-auto max-w-3xl space-y-7">
      <header>
        <p className="section-label text-primary">AI TRANSLATOR</p>
        <h1 className="mt-1">Say it in Kannada</h1>
        <p className="mt-2 text-muted-foreground">
          Type a sentence in Telugu or English — get the Kannada, how to pronounce it, and what it means.
        </p>
      </header>

      <section className="panel p-5" aria-label="Translate">
        <label htmlFor="translate-input" className="section-label">
          Your sentence (Telugu or English)
        </label>
        <textarea
          id="translate-input"
          className="mt-2 min-h-24 w-full rounded-xl border bg-background p-4 text-base focus-visible:outline-2 focus-visible:outline-primary"
          placeholder="ఉదా: నాకు ఒక కప్పు కాఫీ కావాలి"
          value={input}
          maxLength={300}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void translate(input);
          }}
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button onClick={() => void translate(input)} disabled={!input.trim() || status === "loading"}>
            {status === "loading" ? <Loader2 className="animate-spin" /> : <Languages />}
            {status === "loading" ? "Translating…" : "Translate"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setInput("");
              setResult(null);
              setStatus("idle");
            }}
            disabled={!input && !result}
          >
            <Eraser /> Clear
          </Button>
          <span className="text-xs text-muted-foreground">{input.length}/300 · Ctrl+Enter to translate</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs font-bold text-muted-foreground">Try:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary transition-colors hover:bg-accent/70"
              onClick={() => {
                setInput(ex);
                void translate(ex);
              }}
            >
              {ex}
            </button>
          ))}
        </div>
      </section>

      {status === "error" && (
        <section className="panel border-coral/40 bg-coral/5 p-5" role="alert">
          <p className="font-bold text-coral">Something went wrong</p>
          <p className="mt-1 text-sm text-muted-foreground">{errorMsg}</p>
          <Button variant="outline" className="mt-3" onClick={() => void translate(input)}>
            <RefreshCw /> Retry
          </Button>
        </section>
      )}

      {status === "loading" && (
        <section className="panel p-5" aria-busy="true">
          <p className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Asking the AI translator…
          </p>
        </section>
      )}

      {result && status !== "loading" && (
        <section className="panel overflow-hidden" aria-live="polite" aria-label="Translation result">
          <div className="flex items-center gap-2 bg-accent/50 px-5 py-3 text-xs font-extrabold text-primary">
            <Sparkles className="size-4" /> AI TRANSLATION
          </div>
          <div className="space-y-4 p-5">
            <div>
              <p className="section-label">Kannada</p>
              <div className="mt-1 flex items-start justify-between gap-3">
                <p lang="kn" className="kannada-text text-2xl font-bold">
                  {result.kannada}
                </p>
                <div className="flex shrink-0 gap-1">
                  <ListenButton text={result.kannada} />
                  <Button variant="ghost" size="icon" aria-label="Copy Kannada text" onClick={() => copy(result.kannada)}>
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
            {result.teluguPronunciation && (
              <div>
                <p className="section-label">How to say it (Telugu script)</p>
                <p lang="te" className="mt-1 text-lg">
                  {result.teluguPronunciation}
                </p>
              </div>
            )}
            <div>
              <p className="section-label">English meaning</p>
              <p className="mt-1">{result.english}</p>
            </div>
            {result.example && (
              <div className="rounded-xl bg-yellow-soft p-4">
                <p className="section-label text-yellow">Example in use</p>
                <p lang="kn" className="kannada-text mt-1 font-semibold">
                  {result.example}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {history.length > 0 && (
        <section aria-label="Translation history">
          <div className="mb-3 flex items-center justify-between">
            <h2>Recent translations</h2>
            <Button variant="ghost" size="sm" onClick={() => setHistory([])}>
              <Trash2 /> Clear history
            </Button>
          </div>
          <ul className="space-y-2">
            {history.map((h) => (
              <li key={h.id} className="panel flex items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs text-muted-foreground">{h.source}</p>
                  <p lang="kn" className="kannada-text truncate font-bold">
                    {h.kannada}
                  </p>
                </div>
                <ListenButton text={h.kannada} />
                <Button variant="ghost" size="icon" aria-label={`Copy ${h.kannada}`} onClick={() => copy(h.kannada)}>
                  <Copy className="size-4" />
                </Button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Heart className="size-3 text-coral" /> Translations are generated by AI and reviewed for learning use — double-check
        important phrases with a native speaker.
      </p>
    </div>
  );
}
