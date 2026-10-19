import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeftRight, Copy, Eraser, Heart, Languages, Loader2, RefreshCw, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ListenButton } from "@/components/ListenButton";
import { translateText, type Direction, type TranslationResult } from "@/lib/ai/kannada.functions";
import { useGame } from "@/lib/game";

export const Route = createFileRoute("/translator")({
  head: () => ({
    meta: [
      { title: "AI Translator — Kannada for Everyone" },
      { name: "description", content: "Translate Telugu to Kannada and Kannada to Telugu with pronunciation, transliteration and examples." },
      { property: "og:title", content: "AI Telugu ⇄ Kannada translator" },
      { property: "og:description", content: "Telugu to Kannada and back, with transliteration and example sentences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TranslatorPage,
});

interface HistoryItem extends TranslationResult {
  id: string;
  source: string;
  favourite?: boolean;
}

const STORE = "kfe-translations-v1";
const EXAMPLES: Record<Direction, string[]> = {
  "te-kn": ["నాకు ఒక కప్పు కాఫీ కావాలి", "బస్ స్టాప్ ఎక్కడ ఉంది?", "How much does this cost?"],
  "kn-te": ["ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೀರಿ?", "ನನಗೆ ಕನ್ನಡ ಸ್ವಲ್ಪ ಬರುತ್ತದೆ", "ಊಟ ಆಯಿತಾ?"],
};

function loadHistory(): HistoryItem[] {
  try {
    const x = JSON.parse(localStorage.getItem(STORE) ?? "[]");
    return Array.isArray(x) ? x.filter((h) => h && typeof h.translation === "string" && typeof h.source === "string").slice(0, 30) : [];
  } catch {
    return [];
  }
}

function TranslatorPage() {
  const [direction, setDirection] = useState<Direction>("te-kn");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { earn } = useGame();

  useEffect(() => setHistory(loadHistory()), []);
  const saveHistory = (h: HistoryItem[]) => {
    setHistory(h);
    try {
      localStorage.setItem(STORE, JSON.stringify(h));
    } catch {
      /* storage unavailable */
    }
  };

  async function translate(text: string) {
    const trimmed = text.trim();
    if (!trimmed || status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const r = await translateText({ data: { text: trimmed, direction } });
      if ("error" in r) {
        setErrorMsg(r.error);
        setStatus("error");
        return;
      }
      setResult(r);
      saveHistory([{ ...r, id: `${Date.now()}`, source: trimmed }, ...history.filter((h) => !(h.source === trimmed && !h.favourite))].slice(0, 30));
      earn(`translate:${direction}:${trimmed.toLowerCase()}`, 2);
      setStatus("idle");
    } catch (e) {
      setErrorMsg(e instanceof Error && e.message.length < 120 ? e.message : "Translation failed. Check your connection and retry.");
      setStatus("error");
    }
  }

  function copy(text: string) {
    void navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied"))
      .catch(() => toast.error("Copy failed — select the text manually"));
  }

  const toKn = direction === "te-kn";
  const favourites = history.filter((h) => h.favourite);

  return (
    <div className="mx-auto max-w-3xl space-y-7">
      <header>
        <p className="section-label text-primary">AI TRANSLATOR</p>
        <h1 className="mt-1">Telugu ⇄ Kannada</h1>
        <p className="mt-2 text-muted-foreground">
          Get the translation, English transliteration, Telugu-script pronunciation and an example sentence.
        </p>
      </header>

      <section className="panel p-5" aria-label="Translate">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent px-3 py-1 text-sm font-bold">{toKn ? "Telugu / English" : "Kannada"}</span>
          <Button
            variant="outline"
            size="sm"
            aria-label="Swap translation direction"
            onClick={() => {
              setDirection(toKn ? "kn-te" : "te-kn");
              setResult(null);
              setInput(result ? (toKn ? result.kannada : result.translation) : "");
            }}
          >
            <ArrowLeftRight /> Swap
          </Button>
          <span className="rounded-full bg-accent px-3 py-1 text-sm font-bold">{toKn ? "Kannada" : "Telugu"}</span>
        </div>
        <label htmlFor="translate-input" className="section-label">
          {toKn ? "Your sentence (Telugu or English)" : "Your sentence (Kannada)"}
        </label>
        <textarea
          id="translate-input"
          className="mt-2 min-h-24 w-full rounded-xl border bg-background p-4 text-base focus-visible:outline-2 focus-visible:outline-primary"
          placeholder={toKn ? "ఉదా: నాకు ఒక కప్పు కాఫీ కావాలి" : "ಉದಾ: ಊಟ ಆಯಿತಾ?"}
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
          <span className="text-xs text-muted-foreground">{input.length}/300</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs font-bold text-muted-foreground">Try:</span>
          {EXAMPLES[direction].map((ex) => (
            <button
              key={ex}
              type="button"
              className="min-h-8 rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary hover:bg-accent/70"
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
        <section className="panel p-5" role="alert">
          <p className="font-bold text-destructive">Translation failed</p>
          <p className="mt-1 text-sm text-muted-foreground">{errorMsg}</p>
          <Button variant="outline" className="mt-3" onClick={() => void translate(input)} disabled={!input.trim()}>
            <RefreshCw /> Retry
          </Button>
        </section>
      )}

      {status === "loading" && (
        <section className="panel p-5" aria-busy="true" role="status">
          <p className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Asking the AI translator…
          </p>
        </section>
      )}

      {!result && status === "idle" && history.length === 0 && (
        <p className="rounded-xl border border-dashed p-5 text-center text-sm text-muted-foreground">
          No translations yet. Type a sentence or tap an example above.
        </p>
      )}

      {result && status !== "loading" && (
        <section className="panel overflow-hidden" aria-live="polite" aria-label="Translation result">
          <div className="flex items-center gap-2 bg-accent/50 px-5 py-3 text-xs font-extrabold text-primary">
            <Sparkles className="size-4" aria-hidden /> AI-GENERATED TRANSLATION
          </div>
          <div className="space-y-4 p-5">
            <div>
              <p className="section-label">{toKn ? "Kannada" : "Telugu"}</p>
              <div className="mt-1 flex items-start justify-between gap-3">
                <p lang={toKn ? "kn" : "te"} className="kannada-text text-2xl font-bold">
                  {result.translation}
                </p>
                <div className="flex shrink-0 gap-1">
                  {toKn && <ListenButton text={result.kannada} />}
                  <Button variant="ghost" size="icon" aria-label="Copy translation" onClick={() => copy(result.translation)}>
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
            {!toKn && (
              <div className="flex items-center justify-between gap-3">
                <p lang="kn" className="kannada-text text-lg">{result.kannada}</p>
                <ListenButton text={result.kannada} />
              </div>
            )}
            {result.transliteration && (
              <div>
                <p className="section-label">Kannada in English letters</p>
                <p className="mt-1 italic">{result.transliteration}</p>
              </div>
            )}
            {result.teluguPronunciation && (
              <div>
                <p className="section-label">Pronunciation (Telugu script)</p>
                <p lang="te" className="mt-1 text-lg">{result.teluguPronunciation}</p>
              </div>
            )}
            <div>
              <p className="section-label">English meaning</p>
              <p className="mt-1">{result.english}</p>
            </div>
            {result.exampleKannada && (
              <div className="rounded-xl bg-yellow-soft p-4">
                <p className="section-label">Example sentence</p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <p lang="kn" className="kannada-text font-semibold">{result.exampleKannada}</p>
                  <ListenButton text={result.exampleKannada} />
                </div>
                <p className="text-sm text-muted-foreground">{result.exampleMeaning}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {favourites.length > 0 && <HistoryList title="Saved phrases" items={favourites} onCopy={copy} onToggle={(id) => saveHistory(history.map((h) => (h.id === id ? { ...h, favourite: !h.favourite } : h)))} />}

      {history.length > 0 && (
        <div>
          <HistoryList
            title="Recent translations"
            items={history}
            onCopy={copy}
            onToggle={(id) => saveHistory(history.map((h) => (h.id === id ? { ...h, favourite: !h.favourite } : h)))}
          />
          <Button variant="ghost" size="sm" className="mt-2" onClick={() => saveHistory(history.filter((h) => h.favourite))}>
            <Trash2 /> Clear history (keeps saved)
          </Button>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Translations are produced live by an AI model. Double-check important phrases with a native speaker. History is stored only in this browser.
      </p>
    </div>
  );
}

function HistoryList({ title, items, onCopy, onToggle }: { title: string; items: HistoryItem[]; onCopy: (t: string) => void; onToggle: (id: string) => void }) {
  return (
    <section aria-label={title}>
      <h2 className="mb-3">{title}</h2>
      <ul className="space-y-2">
        {items.map((h) => (
          <li key={h.id} className="panel flex items-center gap-2 p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-muted-foreground">{h.source}</p>
              <p className="kannada-text truncate font-bold">{h.translation}</p>
            </div>
            <ListenButton text={h.kannada} />
            <Button variant="ghost" size="icon" aria-label={`Copy ${h.translation}`} onClick={() => onCopy(h.translation)}>
              <Copy className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-pressed={!!h.favourite} aria-label={h.favourite ? "Remove from saved" : "Save phrase"} onClick={() => onToggle(h.id)}>
              <Heart className={`size-4 ${h.favourite ? "fill-current text-destructive" : ""}`} />
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
