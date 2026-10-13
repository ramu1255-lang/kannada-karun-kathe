import type { CategoryId, Word } from "./data";
import { CATEGORIES } from "./data";

export const MAX_QUERY_LENGTH = 50;

/** Trim, remove control characters and cap length. Output is rendered as text only. */
export function sanitizeQuery(raw: unknown): string {
  if (typeof raw !== "string") return "";
  // eslint-disable-next-line no-control-regex
  return raw.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, MAX_QUERY_LENGTH);
}

export function isCategoryId(value: unknown): value is CategoryId {
  return typeof value === "string" && CATEGORIES.some((c) => c.id === value);
}

export function filterByCategory(words: readonly Word[], category: CategoryId | "all"): Word[] {
  if (category === "all") return [...words];
  return words.filter((w) => w.category === category);
}

/** Case-insensitive search across Kannada, English, Telugu and pronunciation. */
export function searchVocabulary(words: readonly Word[], rawQuery: unknown): Word[] {
  const q = sanitizeQuery(rawQuery).toLowerCase();
  if (!q) return [...words];
  return words.filter((w) =>
    [w.kannada, w.english, w.telugu, w.pronunciation].some((f) => f.toLowerCase().includes(q)),
  );
}

export type Rng = () => number;

export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = out[i] as T;
    out[i] = out[j] as T;
    out[j] = tmp;
  }
  return out;
}

export interface QuizQuestion {
  wordId: string;
  prompt: string;
  pronunciation: string;
  options: string[];
  answer: string;
}

export const OPTIONS_PER_QUESTION = 4;

/** Build multiple-choice questions (Kannada -> English). Returns [] if not enough words. */
export function buildQuiz(words: readonly Word[], count: number, rng: Rng = Math.random): QuizQuestion[] {
  const unique = words.filter((w, i, arr) => arr.findIndex((x) => x.english === w.english) === i);
  if (unique.length < OPTIONS_PER_QUESTION || !Number.isFinite(count) || count < 1) return [];
  const picked = shuffle(unique, rng).slice(0, Math.min(Math.floor(count), unique.length));
  return picked.map((word) => {
    const distractors = shuffle(
      unique.filter((w) => w.id !== word.id).map((w) => w.english),
      rng,
    ).slice(0, OPTIONS_PER_QUESTION - 1);
    return {
      wordId: word.id,
      prompt: word.kannada,
      pronunciation: word.pronunciation,
      options: shuffle([word.english, ...distractors], rng),
      answer: word.english,
    };
  });
}

export function isValidAnswer(question: QuizQuestion, choice: unknown): choice is string {
  return typeof choice === "string" && question.options.includes(choice);
}

export function checkAnswer(question: QuizQuestion, choice: unknown): boolean {
  return isValidAnswer(question, choice) && choice === question.answer;
}

export interface QuizScore {
  correct: number;
  total: number;
  percent: number;
}

export function scoreQuiz(questions: readonly QuizQuestion[], answers: readonly unknown[]): QuizScore {
  const total = questions.length;
  const correct = questions.reduce((n, q, i) => n + (checkAnswer(q, answers[i]) ? 1 : 0), 0);
  return { correct, total, percent: total === 0 ? 0 : Math.round((correct / total) * 100) };
}
