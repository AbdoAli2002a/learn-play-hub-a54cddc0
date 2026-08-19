import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AngleFigure, CrossFigure } from "@/components/geometry/AngleFigure";
import { Card, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Activities & Games — Angle Relationships" },
      {
        name: "description",
        content:
          "Interactive angle games: unlimited find-x generator, 360 degree balance challenge, rapid true or false round and a matching activity.",
      },
      { property: "og:title", content: "Activities & Games — Angle Relationships" },
      {
        property: "og:description",
        content:
          "Practise vertically opposite angles and angles at a point through four interactive learning games.",
      },
    ],
  }),
  component: ActivitiesPage,
});

/* ------------------------------------------------------------------ */
/* Game 1 — Find x generator                                           */
/* ------------------------------------------------------------------ */

type Puzzle = {
  angle: number;
  known: number;
  a: number;
  b: number;
  answer: number;
  expr: string;
};

function makePuzzle(): Puzzle {
  const known = 30 + Math.floor(Math.random() * 12) * 5; // 30..85
  const a = 2 + Math.floor(Math.random() * 4); // 2..5
  const answer = 2 + Math.floor(Math.random() * 20);
  const b = known - a * answer;
  return {
    angle: known,
    known,
    a,
    b,
    answer,
    expr: `(${a}x ${b < 0 ? "−" : "+"} ${Math.abs(b)})°`,
  };
}

function FindXGame() {
  const [puzzle, setPuzzle] = useState<Puzzle>(() => makePuzzle());
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const [score, setScore] = useState({ correct: 0, tries: 0 });

  function check() {
    if (value.trim() === "") return;
    const ok = Number(value) === puzzle.answer;
    setState(ok ? "right" : "wrong");
    setScore((s) => ({
      correct: s.correct + (ok ? 1 : 0),
      tries: s.tries + 1,
    }));
  }

  function next() {
    setPuzzle(makePuzzle());
    setValue("");
    setState("idle");
  }

  return (
    <Card>
      <SectionHeading
        eyebrow="Game 1"
        title="Find x — unlimited generator"
        description="Two straight lines intersect. Use the vertically opposite angles rule to find x. A new figure is generated every round."
      />
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <CrossFigure
          angle={Math.max(28, Math.min(75, puzzle.known))}
          labels={[`${puzzle.known}°`, undefined, puzzle.expr, undefined]}
          rayLabels={["B", "C", "A", "D"]}
          caption="AB ∩ CD = {M}"
        />
        <div>
          <p className="math text-sm/7">
            {puzzle.a}x {puzzle.b < 0 ? "−" : "+"} {Math.abs(puzzle.b)} ={" "}
            {puzzle.known}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && check()}
              inputMode="numeric"
              placeholder="x = ?"
              className="math w-32 rounded-lg border border-input bg-paper px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={check}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Check
            </button>
            <button
              type="button"
              onClick={next}
              className="rounded-lg border border-border px-4 py-2 text-sm font-semibold"
            >
              New figure
            </button>
          </div>
          {state === "right" ? (
            <p className="mt-4 rounded-lg bg-success/10 p-3 text-sm font-semibold text-success">
              Correct — x = {puzzle.answer}.
            </p>
          ) : null}
          {state === "wrong" ? (
            <p className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm">
              Not yet. Solve {puzzle.a}x {puzzle.b < 0 ? "−" : "+"}{" "}
              {Math.abs(puzzle.b)} = {puzzle.known}. The correct value is x ={" "}
              <strong>{puzzle.answer}</strong>.
            </p>
          ) : null}
          <p className="mt-4 math text-xs text-muted-foreground">
            Score: {score.correct} / {score.tries}
          </p>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Game 2 — 360 balance                                                */
/* ------------------------------------------------------------------ */

function BalanceGame() {
  const [round, setRound] = useState(0);
  const known = useMemo(() => {
    const a = 40 + ((round * 37) % 90);
    const b = 50 + ((round * 53) % 100);
    const c = 60 + ((round * 29) % 70);
    return [a, b, c];
  }, [round]);
  const target = 360 - known.reduce((s, n) => s + n, 0);
  const [guess, setGuess] = useState(90);
  const diff = Math.abs(guess - target);
  const [locked, setLocked] = useState(false);

  return (
    <Card>
      <SectionHeading
        eyebrow="Game 2"
        title="The 360° balance challenge"
        description="Drag the slider until the missing angle closes the full turn around the point. Perfect closing = 360°."
      />
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <AngleFigure
          sectors={[
            { deg: known[0] ?? 0, label: `${known[0]}°`, tone: "accent" },
            { deg: known[1] ?? 0, label: `${known[1]}°`, tone: "muted" },
            { deg: known[2] ?? 0, label: `${known[2]}°`, tone: "accent" },
            { deg: guess, label: `${guess}°`, tone: "primary" },
          ]}
          rayLabels={["A", "B", "C", "D"]}
          caption={`Current total: ${known.reduce((s, n) => s + n, 0) + guess}°`}
        />
        <div>
          <input
            type="range"
            min={5}
            max={250}
            value={guess}
            onChange={(e) => {
              setGuess(Number(e.target.value));
              setLocked(false);
            }}
            className="w-full accent-[var(--color-primary)]"
            aria-label="Missing angle in degrees"
          />
          <p className="math mt-2 text-sm">Your angle: {guess}°</p>
          <button
            type="button"
            onClick={() => setLocked(true)}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Lock it in
          </button>
          <button
            type="button"
            onClick={() => {
              setRound((r) => r + 1);
              setLocked(false);
            }}
            className="ml-3 rounded-lg border border-border px-4 py-2 text-sm font-semibold"
          >
            Next round
          </button>
          {locked ? (
            <p
              className={`mt-4 rounded-lg p-3 text-sm ${
                diff === 0
                  ? "bg-success/10 font-semibold text-success"
                  : "bg-secondary"
              }`}
            >
              {diff === 0
                ? `Perfect! ${known.join("° + ")}° + ${target}° = 360°.`
                : `You are ${diff}° away. The missing angle is 360° − (${known.join(
                    "° + ",
                  )}°) = ${target}°.`}
            </p>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Game 3 — True or false rapid round                                  */
/* ------------------------------------------------------------------ */

const TF = [
  { s: "Vertically opposite angles always have the same measure.", a: true },
  { s: "Two adjacent angles on a straight line are vertically opposite.", a: false },
  { s: "The angles around one point add up to 180°.", a: false },
  { s: "Four right angles make one complete turn.", a: true },
  { s: "If one of two vertically opposite angles is 90°, the other is 90°.", a: true },
  { s: "Two intersecting lines create three pairs of vertically opposite angles.", a: false },
  { s: "Angles of 100°, 130° and 130° can be accumulated at one point.", a: true },
  { s: "The supplement of 72° is 118°.", a: false },
];

function TrueFalseGame() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const done = i >= TF.length;
  const item = TF[i];

  function answer(v: boolean) {
    if (!item) return;
    const ok = v === item.a;
    if (ok) setScore((s) => s + 1);
    setFeedback(ok ? "Correct!" : `Incorrect — the statement is ${item.a ? "true" : "false"}.`);
    setTimeout(() => {
      setFeedback(null);
      setI((n) => n + 1);
    }, 900);
  }

  return (
    <Card>
      <SectionHeading
        eyebrow="Game 3"
        title="True or false rapid round"
        description="Eight statements about angle relationships. Decide quickly — no figures, just the rules."
      />
      {done ? (
        <div>
          <p className="text-lg font-bold">
            Final score: {score} / {TF.length}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {score === TF.length
              ? "Perfect round — you know both rules."
              : "Review the lesson page and try the round again."}
          </p>
          <button
            type="button"
            onClick={() => {
              setI(0);
              setScore(0);
            }}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Play again
          </button>
        </div>
      ) : (
        <div>
          <p className="math text-xs text-muted-foreground">
            Statement {i + 1} of {TF.length} · Score {score}
          </p>
          <p className="mt-3 text-lg font-semibold">{item?.s}</p>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => answer(true)}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              True
            </button>
            <button
              type="button"
              onClick={() => answer(false)}
              className="rounded-lg border border-border px-6 py-2.5 text-sm font-semibold"
            >
              False
            </button>
          </div>
          {feedback ? (
            <p className="mt-4 text-sm font-semibold text-accent-foreground">
              {feedback}
            </p>
          ) : null}
        </div>
      )}
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Game 4 — Match the term                                             */
/* ------------------------------------------------------------------ */

const PAIRS = [
  { term: "Vertically opposite angles", def: "Two non-adjacent angles formed by two intersecting straight lines." },
  { term: "Accumulative angles at a point", def: "Angles with a common vertex whose measures add up to 360°." },
  { term: "Straight angle", def: "An angle of measure 180°, formed along one straight line." },
  { term: "Angle bisector", def: "A ray that divides an angle into two congruent angles." },
  { term: "Congruent angles", def: "Angles that have exactly the same measure." },
];

function MatchGame() {
  const [selected, setSelected] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const defs = useMemo(
    () => PAIRS.map((p, i) => ({ ...p, i })).sort((a, b) => (a.def > b.def ? 1 : -1)),
    [],
  );

  function pickDef(i: number) {
    if (selected === null) return;
    if (selected === i) {
      setMatched((m) => [...m, i]);
      setSelected(null);
      setWrong(null);
    } else {
      setWrong(i);
      setTimeout(() => setWrong(null), 700);
    }
  }

  return (
    <Card>
      <SectionHeading
        eyebrow="Game 4"
        title="Match the term to its definition"
        description="Select a term on the left, then click the definition that belongs to it."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <ul className="space-y-2">
          {PAIRS.map((p, i) => {
            const isMatched = matched.includes(i);
            return (
              <li key={p.term}>
                <button
                  type="button"
                  disabled={isMatched}
                  onClick={() => setSelected(i)}
                  className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    isMatched
                      ? "border-success bg-success/10 text-success"
                      : selected === i
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-secondary"
                  }`}
                >
                  {p.term}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="space-y-2">
          {defs.map((d) => {
            const isMatched = matched.includes(d.i);
            return (
              <li key={d.def}>
                <button
                  type="button"
                  disabled={isMatched}
                  onClick={() => pickDef(d.i)}
                  className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                    isMatched
                      ? "border-success bg-success/10"
                      : wrong === d.i
                        ? "border-destructive bg-destructive/10"
                        : "border-border hover:bg-secondary"
                  }`}
                >
                  {d.def}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="math mt-5 text-sm font-semibold">
        Matched: {matched.length} / {PAIRS.length}
      </p>
      {matched.length === PAIRS.length ? (
        <button
          type="button"
          onClick={() => setMatched([])}
          className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Reset activity
        </button>
      ) : null}
    </Card>
  );
}

/* ------------------------------------------------------------------ */

function ActivitiesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">Activities & Games</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Four interactive activities that turn the two rules of this lesson into
        practice. Everything runs instantly in the browser — no sign in required.
      </p>

      <div className="mt-10 space-y-10">
        <FindXGame />
        <BalanceGame />
        <TrueFalseGame />
        <MatchGame />

        <Card>
          <SectionHeading
            eyebrow="Classroom activity"
            title="Off-screen tasks for pairs"
            description="Three quick tasks that need only a ruler, a protractor and paper."
          />
          <ol className="list-decimal space-y-3 pl-5 text-sm/7">
            <li>
              <strong>The scissors investigation.</strong> Open a pair of scissors,
              measure the two angles between the blades and record them. Repeat five
              times. What stays true about the two opposite angles?
            </li>
            <li>
              <strong>Design a crossroads.</strong> Draw two roads crossing at one
              point. Label one angle only, then challenge a partner to label all four
              angles and justify each with a rule.
            </li>
            <li>
              <strong>Pizza 360.</strong> Draw a circle and cut it into four sectors
              from the centre. Measure three sectors and predict the fourth before
              measuring it. Compare the prediction with the measurement.
            </li>
          </ol>
        </Card>
      </div>
    </main>
  );
}
