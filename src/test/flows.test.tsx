import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { VocabularyBrowser } from "@/components/VocabularyBrowser";
import { Quiz } from "@/components/Quiz";
import { NAV_ITEMS } from "@/components/SiteNav";
import { VOCABULARY } from "@/lib/kannada/data";

const seeded = (seed = 7) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

describe("navigation", () => {
  it("every nav item resolves to a real page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const item of NAV_ITEMS) {
      expect(router.matchRoutes(item.to).at(-1)?.routeId).toBe(item.to);
    }
    expect(router.matchRoutes("/does-not-exist").at(-1)?.routeId).not.toBe("/quiz");
  });
});

describe("vocabulary flow", () => {
  it("searches, filters, shows empty state and toggles learned", () => {
    const onToggle = vi.fn();
    render(<VocabularyBrowser words={VOCABULARY} learnedIds={["water"]} onToggleLearned={onToggle} />);
    expect(screen.getByRole("status")).toHaveTextContent(`${VOCABULARY.length} words found`);

    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: "numbers" } });
    expect(screen.getByRole("status")).toHaveTextContent("5 words found");

    fireEvent.change(screen.getByLabelText(/search/i), { target: { value: "xyz" } });
    expect(screen.getByText(/no words match/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: "all" } });
    fireEvent.change(screen.getByLabelText(/search/i), { target: { value: "water" } });
    const btn = screen.getByRole("button", { name: /unmark “water” as learned/i });
    expect(btn).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(btn);
    expect(onToggle).toHaveBeenCalledWith("water");
  });
});

describe("quiz flow", () => {
  it("requires an answer, gives text feedback, and reports the final score", () => {
    const onComplete = vi.fn();
    render(<Quiz words={VOCABULARY} count={2} rng={seeded()} onComplete={onComplete} />);

    fireEvent.click(screen.getByRole("button", { name: /check answer/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/choose an answer/i);

    // Q1: answer correctly using the revealed answer after a wrong pick is impossible, so pick by inspecting radios.
    const answerFor = () => {
      const radios = screen.getAllByRole("radio") as HTMLInputElement[];
      return radios;
    };
    // pick first option, check, then proceed
    fireEvent.click(answerFor()[0]);
    fireEvent.click(screen.getByRole("button", { name: /check answer/i }));
    expect(screen.getByText(/correct!|incorrect\. the answer is/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /next question/i }));

    fireEvent.click(answerFor()[1]);
    fireEvent.click(screen.getByRole("button", { name: /check answer/i }));
    fireEvent.click(screen.getByRole("button", { name: /see results/i }));

    expect(onComplete).toHaveBeenCalledTimes(1);
    const score = onComplete.mock.calls[0][0];
    expect(score.total).toBe(2);
    const result = screen.getByRole("heading", { name: /quiz complete/i }).parentElement!;
    expect(within(result).getByText(new RegExp(`${score.correct} out of 2`))).toBeInTheDocument();
  });

  it("shows an empty state when there are too few words", () => {
    render(<Quiz words={VOCABULARY.slice(0, 2)} />);
    expect(screen.getByText(/not enough words/i)).toBeInTheDocument();
  });
});
