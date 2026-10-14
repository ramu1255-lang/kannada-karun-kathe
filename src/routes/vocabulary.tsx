import { createFileRoute } from "@tanstack/react-router";
import { VocabularyBrowser } from "@/components/VocabularyBrowser";
import { VOCABULARY } from "@/lib/kannada/data";
import { toggleLearned, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/vocabulary")({
  head: () => ({
    meta: [
      { title: "Vocabulary — Kannada for Everyone" },
      { name: "description", content: "Search everyday Kannada words with English, Telugu meanings and pronunciation." },
      { property: "og:title", content: "Kannada Vocabulary" },
      { property: "og:description", content: "Search everyday Kannada words by category." },
    ],
  }),
  component: VocabularyPage,
});

import { useGame } from "@/lib/game";

function VocabularyPage() {
  const {earn}=useGame();
  const { progress, update } = useProgress();
  return (
    <div>
      <p className="section-label mb-2">Build your word collection</p>
      <h1 className="text-3xl font-bold">Vocabulary</h1>
      <p className="mb-6 text-muted-foreground">Everyday words. Real-world confidence.</p>
      <VocabularyBrowser
        words={VOCABULARY}
        learnedIds={progress.learnedWordIds}
        onToggleLearned={(id) => { if(!progress.learnedWordIds.includes(id))earn(`word:${id}`,5);update((p) => toggleLearned(p, id)); }}
      />
    </div>
  );
}
