import { useRef, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Word } from "@/lib/kannada/data";
import { buildQuiz, checkAnswer, isValidAnswer, scoreQuiz, type QuizQuestion, type QuizScore, type Rng } from "@/lib/kannada/logic";

interface Props {
  words: readonly Word[];
  count?: number;
  rng?: Rng;
  onComplete?: (score: QuizScore) => void;
}

export function Quiz({ words, count = 5, rng, onComplete }: Props) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => buildQuiz(words, count, rng));
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  if (questions.length === 0) {
    return <p className="rounded-lg border border-dashed p-6">Not enough words are available to build a quiz yet.</p>;
  }

  const done = answers.length === questions.length && submitted === false;
  if (done) {
    const score = scoreQuiz(questions, answers);
    return (
      <section aria-labelledby="quiz-result" className="rounded-xl border bg-card p-6 text-center">
        <h2 id="quiz-result" tabIndex={-1} className="text-2xl font-bold">
          Quiz complete
        </h2>
        <p className="mt-2 text-lg">
          You scored {score.correct} out of {score.total} ({score.percent}%).
        </p>
        <button
          type="button"
          onClick={() => {
            setQuestions(buildQuiz(words, count, rng));
            setAnswers([]);
            setIndex(0);
            setChoice(null);
          }}
          className="mt-4 min-h-11 rounded-md bg-primary px-5 font-semibold text-primary-foreground hover:opacity-90"
        >
          Try a new quiz
        </button>
      </section>
    );
  }

  const q = questions[index] ?? questions[0]!;
  const correct = submitted && checkAnswer(q, choice);

  const submit = () => {
    if (!isValidAnswer(q, choice)) {
      setError("Please choose an answer before checking.");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const next = () => {
    const nextAnswers = [...answers, choice as string];
    setAnswers(nextAnswers);
    setSubmitted(false);
    setChoice(null);
    if (nextAnswers.length === questions.length) {
      onComplete?.(scoreQuiz(questions, nextAnswers));
    } else {
      setIndex(index + 1);
      headingRef.current?.focus();
    }
  };

  return (
    <section aria-labelledby="quiz-q" className="rounded-xl border bg-card p-6">
      <p className="text-sm text-muted-foreground">
        Question {index + 1} of {questions.length}
      </p>
      <h2 id="quiz-q" ref={headingRef} tabIndex={-1} className="mt-1 text-xl font-bold">
        What does <span lang="kn" className="kannada-text text-3xl">{q.prompt}</span> mean?
      </h2>
      <p className="text-sm text-muted-foreground">Pronounced: {q.pronunciation}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (submitted) next();
          else submit();
        }}
      >
        <fieldset className="mt-4" disabled={submitted} aria-describedby={error ? "quiz-error" : undefined}>
          <legend className="sr-only">Choose the English meaning</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {q.options.map((opt) => {
              const isAnswer = submitted && opt === q.answer;
              const isWrongPick = submitted && opt === choice && opt !== q.answer;
              return (
                <label
                  key={opt}
                  className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-md border-2 px-3 py-2 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-ring ${
                    isAnswer ? "border-success" : isWrongPick ? "border-destructive" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${index}`}
                    value={opt}
                    checked={choice === opt}
                    onChange={() => setChoice(opt)}
                    className="size-4 accent-primary"
                  />
                  <span>{opt}</span>
                  {isAnswer && <span className="ml-auto text-sm font-semibold text-success">(correct answer)</span>}
                  {isWrongPick && <span className="ml-auto text-sm font-semibold text-destructive">(your answer)</span>}
                </label>
              );
            })}
          </div>
        </fieldset>

        {error && (
          <p id="quiz-error" role="alert" className="mt-3 font-medium text-destructive">
            {error}
          </p>
        )}

        <div aria-live="polite" className="mt-3 min-h-7">
          {submitted && (
            <p className={`flex items-center gap-2 font-semibold ${correct ? "text-success" : "text-destructive"}`}>
              {correct ? <CheckCircle2 aria-hidden="true" className="size-5" /> : <XCircle aria-hidden="true" className="size-5" />}
              {correct ? "Correct!" : `Incorrect. The answer is “${q.answer}”.`}
            </p>
          )}
        </div>

        <button type="submit" className="mt-3 min-h-11 rounded-md bg-primary px-5 font-semibold text-primary-foreground hover:opacity-90">
          {submitted ? (index + 1 === questions.length ? "See results" : "Next question") : "Check answer"}
        </button>
      </form>
    </section>
  );
}
