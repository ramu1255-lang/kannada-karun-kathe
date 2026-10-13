import { useId, useMemo, useState } from "react";
import { Check, Plus } from "lucide-react";
import { CATEGORIES, type CategoryId, type Word } from "@/lib/kannada/data";
import { filterByCategory, isCategoryId, MAX_QUERY_LENGTH, searchVocabulary } from "@/lib/kannada/logic";

interface Props {
  words: readonly Word[];
  learnedIds: readonly string[];
  onToggleLearned: (id: string) => void;
}

export function VocabularyBrowser({ words, learnedIds, onToggleLearned }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const searchId = useId();
  const catId = useId();

  const results = useMemo(
    () => searchVocabulary(filterByCategory(words, category), query),
    [words, category, query],
  );
  const learned = useMemo(() => new Set(learnedIds), [learnedIds]);

  return (
    <div>
      <form role="search" className="grid gap-3 sm:grid-cols-[2fr_1fr]" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-1">
          <label htmlFor={searchId} className="text-sm font-medium">
            Search in English, Kannada, Telugu or pronunciation
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            maxLength={MAX_QUERY_LENGTH}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. water, ನೀರು, nee-ru"
            className="min-h-11 rounded-md border border-input bg-card px-3 placeholder:text-muted-foreground"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor={catId} className="text-sm font-medium">
            Category
          </label>
          <select
            id={catId}
            value={category}
            onChange={(e) => setCategory(isCategoryId(e.target.value) ? e.target.value : "all")}
            className="min-h-11 rounded-md border border-input bg-card px-3"
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </form>

      <p role="status" aria-live="polite" className="mt-4 text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "word" : "words"} found
      </p>

      {results.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed p-6 text-center">
          No words match your search. Try another word or choose “All categories”.
        </p>
      ) : (
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {results.map((w) => {
            const isLearned = learned.has(w.id);
            return (
              <li key={w.id} className="rounded-xl border bg-card p-4">
                <p lang="kn" className="kannada-text text-2xl font-semibold">
                  {w.kannada}
                </p>
                <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 text-sm">
                  <dt className="text-muted-foreground">Say</dt>
                  <dd>{w.pronunciation}</dd>
                  <dt className="text-muted-foreground">English</dt>
                  <dd>{w.english}</dd>
                  <dt className="text-muted-foreground">Telugu</dt>
                  <dd lang="te">{w.telugu}</dd>
                </dl>
                <button
                  type="button"
                  aria-pressed={isLearned}
                  aria-label={`${isLearned ? "Unmark" : "Mark"} “${w.english}” as learned`}
                  onClick={() => onToggleLearned(w.id)}
                  className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-md border px-3 text-sm font-medium hover:bg-muted aria-pressed:bg-success aria-pressed:text-success-foreground"
                >
                  {isLearned ? <Check aria-hidden="true" className="size-4" /> : <Plus aria-hidden="true" className="size-4" />}
                  {isLearned ? "Learned" : "Mark learned"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
