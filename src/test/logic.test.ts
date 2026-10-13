import { describe, expect, it } from "vitest";
import { CATEGORIES, CONVERSATIONS, VOCABULARY } from "@/lib/kannada/data";
import {
  buildQuiz, checkAnswer, filterByCategory, isCategoryId, isValidAnswer,
  MAX_QUERY_LENGTH, sanitizeQuery, scoreQuiz, searchVocabulary,
} from "@/lib/kannada/logic";
import {
  EMPTY_PROGRESS, loadProgress, parseProgress, recordQuizResult, saveProgress, STORAGE_KEY, toggleLearned,
} from "@/lib/progress";

const seeded = (seed = 1) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

describe("data integrity", () => {
  it("has unique ids, valid categories and all fields filled", () => {
    expect(new Set(VOCABULARY.map((w) => w.id)).size).toBe(VOCABULARY.length);
    for (const w of VOCABULARY) {
      expect(isCategoryId(w.category)).toBe(true);
      expect(w.kannada).toMatch(/[\u0C80-\u0CFF]/);
      expect(w.telugu).toMatch(/[\u0C00-\u0C7F]/);
      expect(w.english && w.pronunciation).toBeTruthy();
    }
    for (const c of CATEGORIES) expect(filterByCategory(VOCABULARY, c.id).length).toBeGreaterThan(0);
    for (const c of CONVERSATIONS) for (const l of c.lines) expect(l.kannada).toMatch(/[\u0C80-\u0CFF]/);
  });
});

describe("search", () => {
  it("matches English case-insensitively, Kannada, Telugu and pronunciation", () => {
    expect(searchVocabulary(VOCABULARY, "WATER").map((w) => w.id)).toEqual(["water"]);
    expect(searchVocabulary(VOCABULARY, "ನೀರು").map((w) => w.id)).toEqual(["water"]);
    expect(searchVocabulary(VOCABULARY, "పాలు").map((w) => w.id)).toEqual(["milk"]);
    expect(searchVocabulary(VOCABULARY, "naal").map((w) => w.id)).toEqual(["four"]);
  });
  it("returns everything for empty/whitespace/non-string input and nothing for no match", () => {
    expect(searchVocabulary(VOCABULARY, "").length).toBe(VOCABULARY.length);
    expect(searchVocabulary(VOCABULARY, "   ").length).toBe(VOCABULARY.length);
    expect(searchVocabulary(VOCABULARY, undefined).length).toBe(VOCABULARY.length);
    expect(searchVocabulary(VOCABULARY, "zzzz")).toEqual([]);
    expect(searchVocabulary([], "water")).toEqual([]);
  });
  it("sanitizes control chars and caps length; HTML stays inert text", () => {
    expect(sanitizeQuery("  wa\u0000ter\n ")).toBe("water");
    expect(sanitizeQuery("a".repeat(200)).length).toBe(MAX_QUERY_LENGTH);
    expect(searchVocabulary(VOCABULARY, "<script>alert(1)</script>")).toEqual([]);
  });
});

describe("category filter", () => {
  it("filters and supports all", () => {
    expect(filterByCategory(VOCABULARY, "numbers").every((w) => w.category === "numbers")).toBe(true);
    expect(filterByCategory(VOCABULARY, "all").length).toBe(VOCABULARY.length);
    expect(isCategoryId("bogus")).toBe(false);
  });
});

describe("quiz", () => {
  const qs = buildQuiz(VOCABULARY, 5, seeded());
  it("builds questions with 4 unique options including the answer", () => {
    expect(qs).toHaveLength(5);
    for (const q of qs) {
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect(q.options).toContain(q.answer);
    }
    expect(new Set(qs.map((q) => q.wordId)).size).toBe(5);
  });
  it("handles too few words and bad counts", () => {
    expect(buildQuiz(VOCABULARY.slice(0, 3), 5)).toEqual([]);
    expect(buildQuiz(VOCABULARY, 0)).toEqual([]);
    expect(buildQuiz(VOCABULARY, Number.NaN)).toEqual([]);
    expect(buildQuiz(VOCABULARY.slice(0, 4), 10)).toHaveLength(4);
  });
  it("validates and checks answers", () => {
    const q = qs[0];
    const wrong = q.options.find((o) => o !== q.answer)!;
    expect(checkAnswer(q, q.answer)).toBe(true);
    expect(checkAnswer(q, wrong)).toBe(false);
    expect(isValidAnswer(q, "not an option")).toBe(false);
    expect(checkAnswer(q, null)).toBe(false);
    expect(checkAnswer(q, 42)).toBe(false);
  });
  it("scores correctly, including empty and missing answers", () => {
    expect(scoreQuiz(qs, qs.map((q) => q.answer))).toEqual({ correct: 5, total: 5, percent: 100 });
    expect(scoreQuiz(qs, [qs[0].answer, qs[1].answer])).toEqual({ correct: 2, total: 5, percent: 40 });
    expect(scoreQuiz([], [])).toEqual({ correct: 0, total: 0, percent: 0 });
  });
});

describe("progress", () => {
  it("toggles learned words and records quiz results", () => {
    let p = toggleLearned(EMPTY_PROGRESS, "water");
    expect(p.learnedWordIds).toEqual(["water"]);
    p = toggleLearned(p, "water");
    expect(p.learnedWordIds).toEqual([]);
    p = recordQuizResult(p, { correct: 3, total: 5, percent: 60 });
    p = recordQuizResult(p, { correct: 1, total: 5, percent: 20 });
    expect(p).toMatchObject({ quizzesTaken: 2, bestPercent: 60, lastPercent: 20 });
    expect(recordQuizResult(p, { correct: 0, total: 0, percent: 0 })).toBe(p);
  });
  it("survives corrupt or malicious stored data", () => {
    expect(parseProgress("not json")).toEqual(EMPTY_PROGRESS);
    expect(parseProgress(null)).toEqual(EMPTY_PROGRESS);
    expect(parseProgress('{"learnedWordIds":[1,"a","a"],"bestPercent":999,"quizzesTaken":-3}')).toEqual({
      learnedWordIds: ["a"], quizzesTaken: 0, bestPercent: 100, lastPercent: null,
    });
  });
  it("round-trips through storage and tolerates throwing storage", () => {
    const mem = new Map<string, string>();
    const storage = { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => void mem.set(k, v), removeItem: () => {} };
    saveProgress(storage, { ...EMPTY_PROGRESS, learnedWordIds: ["one"] });
    expect(mem.has(STORAGE_KEY)).toBe(true);
    expect(loadProgress(storage).learnedWordIds).toEqual(["one"]);
    const bad = { getItem: () => { throw new Error("x"); }, setItem: () => { throw new Error("x"); }, removeItem: () => {} };
    expect(loadProgress(bad)).toEqual(EMPTY_PROGRESS);
    expect(() => saveProgress(bad, EMPTY_PROGRESS)).not.toThrow();
  });
});
