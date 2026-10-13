import { createFileRoute } from "@tanstack/react-router";
import { VOCABULARY } from "@/lib/kannada/data";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Your progress — Kannada for Everyone" },
      { name: "description", content: "Track learned Kannada words and quiz scores, stored only on your device." },
      { property: "og:title", content: "Kannada Learning Progress" },
      { property: "og:description", content: "See learned words and quiz scores." },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const { progress, ready, reset } = useProgress();
  const learned = progress.learnedWordIds.filter((id) => VOCABULARY.some((w) => w.id === id)).length;
  const pct = Math.round((learned / VOCABULARY.length) * 100);

  return (
    <div>
      <h1 className="text-3xl font-bold">Your progress</h1>
      <p className="mb-6 text-muted-foreground">Saved only in this browser. No account or personal data needed.</p>
      {!ready ? (
        <p role="status">Loading progress…</p>
      ) : (
        <>
          <dl className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-card p-4">
              <dt className="text-sm text-muted-foreground">Words learned</dt>
              <dd className="text-3xl font-bold">{learned} / {VOCABULARY.length}</dd>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <dt className="text-sm text-muted-foreground">Quizzes taken</dt>
              <dd className="text-3xl font-bold">{progress.quizzesTaken}</dd>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <dt className="text-sm text-muted-foreground">Best score</dt>
              <dd className="text-3xl font-bold">{progress.quizzesTaken ? `${progress.bestPercent}%` : "—"}</dd>
            </div>
          </dl>
          <label htmlFor="vocab-progress" className="mt-6 block text-sm font-medium">Vocabulary completion: {pct}%</label>
          <progress id="vocab-progress" value={learned} max={VOCABULARY.length} className="mt-1 h-3 w-full accent-primary" />
          <button
            type="button"
            onClick={() => { if (window.confirm("Reset all progress?")) reset(); }}
            className="mt-6 min-h-11 rounded-md border border-destructive px-4 font-medium text-destructive hover:bg-muted"
          >
            Reset progress
          </button>
        </>
      )}
    </div>
  );
}
