import { createFileRoute, Link } from "@tanstack/react-router";
import { CONVERSATIONS, VOCABULARY } from "@/lib/kannada/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kannada for Everyone — Learn everyday Kannada" },
      { name: "description", content: "Learn practical Kannada with vocabulary, real conversations, Telugu meanings and quizzes." },
      { property: "og:title", content: "Kannada for Everyone" },
      { property: "og:description", content: "Learn practical everyday Kannada with conversations, vocabulary and guided practice." },
    ],
  }),
  component: Index,
});

const FEATURES = [
  { to: "/vocabulary", title: "Vocabulary", text: `${VOCABULARY.length} everyday words with English, Telugu and pronunciation.` },
  { to: "/conversations", title: "Conversations", text: `${CONVERSATIONS.length} real-life dialogues: neighbours, autos, restaurants.` },
  { to: "/quiz", title: "Quiz", text: "Check yourself with quick multiple-choice practice." },
] as const;

function Index() {
  return (
    <div className="space-y-10">
      <section className="pt-6">
        <p lang="kn" className="kannada-text text-4xl font-bold text-primary">ನಮಸ್ಕಾರ!</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Speak everyday Kannada with confidence</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          For newcomers to Karnataka: learn the words and phrases you actually need, with Telugu meanings and simple pronunciation guides.
        </p>
        <Link to="/vocabulary" className="mt-6 inline-flex min-h-11 items-center rounded-md bg-primary px-6 font-semibold text-primary-foreground hover:opacity-90">
          Start learning
        </Link>
      </section>
      <section aria-labelledby="features">
        <h2 id="features" className="text-2xl font-bold">How you'll learn</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <li key={f.to}>
              <Link to={f.to} className="block h-full rounded-xl border bg-card p-5 hover:border-primary">
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="mt-1 text-muted-foreground">{f.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
