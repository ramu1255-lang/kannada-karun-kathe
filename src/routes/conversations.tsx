import { createFileRoute } from "@tanstack/react-router";
import { CONVERSATIONS } from "@/lib/kannada/data";

export const Route = createFileRoute("/conversations")({
  head: () => ({
    meta: [
      { title: "Conversations — Kannada for Everyone" },
      { name: "description", content: "Practise real Kannada dialogues for everyday situations." },
      { property: "og:title", content: "Everyday Kannada Conversations" },
      { property: "og:description", content: "Short Kannada dialogues with pronunciation and English." },
    ],
  }),
  component: ConversationsPage,
});

function ConversationsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Conversations</h1>
      <p className="mb-6 text-muted-foreground">Read each line aloud using the pronunciation guide.</p>
      <div className="space-y-6">
        {CONVERSATIONS.map((c) => (
          <article key={c.id} aria-labelledby={`c-${c.id}`} className="rounded-xl border bg-card p-5">
            <h2 id={`c-${c.id}`} className="text-2xl font-bold">{c.title}</h2>
            <p className="text-muted-foreground">{c.situation}</p>
            <ol className="mt-4 space-y-3">
              {c.lines.map((l, i) => (
                <li key={i} className="border-l-4 border-secondary pl-3">
                  <p className="text-sm font-semibold text-primary">{l.speaker}</p>
                  <p lang="kn" className="kannada-text text-xl">{l.kannada}</p>
                  <p className="text-sm italic">{l.pronunciation}</p>
                  <p className="text-sm text-muted-foreground">{l.english}</p>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}
