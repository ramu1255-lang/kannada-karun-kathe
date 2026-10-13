import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { Quiz } from "@/components/Quiz";
import { VOCABULARY } from "@/lib/kannada/data";
import { recordQuizResult, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz — Kannada for Everyone" },
      { name: "description", content: "Test your everyday Kannada vocabulary with a quick quiz." },
      { property: "og:title", content: "Kannada Quiz" },
      { property: "og:description", content: "Multiple-choice practice for everyday Kannada words." },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const { update } = useProgress();
  return (
    <div>
      <h1 className="text-3xl font-bold">Quiz</h1>
      <p className="mb-6 text-muted-foreground">Choose the English meaning of each Kannada word.</p>
      {/* Questions are randomised, so render on the client to avoid hydration mismatch. */}
      <ClientOnly fallback={<p role="status">Loading quiz…</p>}>
        <Quiz words={VOCABULARY} onComplete={(s) => update((p) => recordQuizResult(p, s))} />
      </ClientOnly>
    </div>
  );
}
