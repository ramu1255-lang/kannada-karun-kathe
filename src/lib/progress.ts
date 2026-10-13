import { useCallback, useEffect, useState } from "react";
import type { QuizScore } from "./kannada/logic";

/** Only learning progress is stored, locally on the device. No personal data. */
export interface Progress {
  learnedWordIds: string[];
  quizzesTaken: number;
  bestPercent: number;
  lastPercent: number | null;
}

export const STORAGE_KEY = "kfe-progress-v1";

export const EMPTY_PROGRESS: Progress = {
  learnedWordIds: [],
  quizzesTaken: 0,
  bestPercent: 0,
  lastPercent: null,
};

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const clampPercent = (n: unknown) =>
  typeof n === "number" && Number.isFinite(n) ? Math.min(100, Math.max(0, Math.round(n))) : 0;

/** Parse untrusted stored JSON defensively; any corruption falls back to empty progress. */
export function parseProgress(raw: string | null): Progress {
  if (!raw) return { ...EMPTY_PROGRESS };
  try {
    const d = JSON.parse(raw) as Record<string, unknown>;
    if (!d || typeof d !== "object") return { ...EMPTY_PROGRESS };
    const ids = Array.isArray(d["learnedWordIds"])
      ? [...new Set(d["learnedWordIds"].filter((x): x is string => typeof x === "string" && x.length <= 64))]
      : [];
    return {
      learnedWordIds: ids,
      quizzesTaken:
        typeof d["quizzesTaken"] === "number" && d["quizzesTaken"] >= 0 ? Math.floor(d["quizzesTaken"]) : 0,
      bestPercent: clampPercent(d["bestPercent"]),
      lastPercent: d["lastPercent"] === null || d["lastPercent"] === undefined ? null : clampPercent(d["lastPercent"]),
    };
  } catch {
    return { ...EMPTY_PROGRESS };
  }
}

export function loadProgress(storage: StorageLike | undefined): Progress {
  try {
    return parseProgress(storage?.getItem(STORAGE_KEY) ?? null);
  } catch {
    return { ...EMPTY_PROGRESS };
  }
}

export function saveProgress(storage: StorageLike | undefined, p: Progress): void {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* storage full or blocked: progress stays in memory only */
  }
}

export function toggleLearned(p: Progress, wordId: string): Progress {
  const has = p.learnedWordIds.includes(wordId);
  return {
    ...p,
    learnedWordIds: has ? p.learnedWordIds.filter((id) => id !== wordId) : [...p.learnedWordIds, wordId],
  };
}

export function recordQuizResult(p: Progress, score: QuizScore): Progress {
  if (score.total === 0) return p;
  return {
    ...p,
    quizzesTaken: p.quizzesTaken + 1,
    bestPercent: Math.max(p.bestPercent, score.percent),
    lastPercent: score.percent,
  };
}

const getStorage = () => (typeof window === "undefined" ? undefined : window.localStorage);

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(EMPTY_PROGRESS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(loadProgress(getStorage()));
    setReady(true);
  }, []);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    setProgress((prev) => {
      const next = fn(prev);
      saveProgress(getStorage(), next);
      return next;
    });
  }, []);

  const reset = useCallback(() => update(() => ({ ...EMPTY_PROGRESS })), [update]);

  return { progress, ready, update, reset };
}
