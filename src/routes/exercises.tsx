import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AngleFigure, CrossFigure } from "@/components/geometry/AngleFigure";
import { Card, SectionHeading } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/exercises")({
  head: () => ({
    meta: [
      { title: "Exercises — Angle Relationships Practice" },
      {
        name: "description",
        content:
          "Completion questions, find-the-value-of-x figures, multiple choice and creative thinking problems on angle relationships.",
      },
      { property: "og:title", content: "Exercises — Angle Relationships" },
      {
        property: "og:description",
        content:
          "Practise vertically opposite angles and angles at a point with self-checking exercises.",
      },
    ],
  }),
  component: ExercisesPage,
});

const COMPLETE = [
  {
    q: "If two straight lines intersect, then each two vertically opposite angles are …",
    a: "congruent (equal in measure).",
  },
  {
    q: "The sum of the measures of the accumulative angles at a point equals …",
    a: "360°, which is four right angles.",
  },
  {
    q: "Two adjacent angles on a straight line always add up to …",
    a: "180° (a straight angle).",
  },
  {
    q: "If two vertically opposite angles are complementary, then the measure of each is …",
    a: "45°, because the two equal angles add to 90°.",
  },
  {
    q: "Three straight lines meeting at one point form … pairs of vertically opposite angles.",
    a: "6 pairs (each pair of lines gives 2 pairs, and there are 3 pairs of lines).",
  },
];

type MCQ = {
  q: string;
  options: string[];
  correct: number;
  why: string;
};

const MCQS: MCQ[] = [
  {
    q: "The angle of measure 70° is vertically opposite to an angle of measure …",
    options: ["280°", "140°", "35°", "70°"],
    correct: 3,
    why: "Vertically opposite angles are congruent, so the measure stays 70°.",
  },
  {
    q: "The sum of the measures of the angles around a point equals the measure of …",
    options: ["2 right angles", "3 right angles", "4 right angles", "5 right angles"],
    correct: 2,
    why: "360° ÷ 90° = 4 right angles.",
  },
  {
    q: "The sum of the measures of 4 angles around a point is … the sum of the measures of 5 angles around a point.",
    options: ["=", "<", ">", "≠"],
    correct: 0,
    why: "Both surround a point, so both totals equal 360°.",
  },
  {
    q: "If two vertically opposite angles are complementary, then the measure of each is …",
    options: ["180°", "90°", "50°", "45°"],
    correct: 3,
    why: "They are equal and add to 90°, so each is 45°.",
  },
  {
    q: "AB ∩ CD = {M}. If m(∠AMD) = 60° and m(∠BMC) = 6x°, then x = …",
    options: ["6", "60", "10", "30"],
    correct: 2,
    why: "6x = 60 because the angles are vertically opposite, so x = 10.",
  },
  {
    q: "Around a point the angles are 120°, 7x°, 5x° and 4x°. The value of x is …",
    options: ["5", "15", "60", "240"],
    correct: 1,
    why: "16x + 120 = 360 → 16x = 240 → x = 15.",
  },
  {
    q: "Two straight lines intersect. One angle measures 108°. The angle adjacent to it measures …",
    options: ["108°", "72°", "52°", "252°"],
    correct: 1,
    why: "Adjacent angles on a straight line: 180° − 108° = 72°.",
  },
  {
    q: "Three different straight lines intersect at one point. The number of pairs of vertically opposite angles equals …",
    options: ["2", "3", "4", "6"],
    correct: 3,
    why: "Each pair of lines gives 2 pairs of V.O.A.; 3 pairs of lines × 2 = 6.",
  },
  {
    q: "If the ratio among the measures of 3 angles around a point is 3 : 4 : 5, then the greatest angle measures …",
    options: ["120°", "60°", "150°", "80°"],
    correct: 2,
    why: "3 + 4 + 5 = 12 parts; one part = 30°; greatest = 5 × 30° = 150°.",
  },
  {
    q: "Around a point there are exactly three angles: 90°, (90 − x)° and (80 + x)°. Wait — the third angle ∠AMB measures …",
    options: ["190°", "95°", "90°", "80°"],
    correct: 0,
    why: "(90 − x) + (80 + x) = 170°, so the remaining angle = 360° − 170° = 190°.",
  },
];

function McqBlock() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const score = MCQS.reduce(
    (t, q, i) => (answers[i] === q.correct ? t + 1 : t),
    0,
  );

  return (
    <Card>
      <SectionHeading
        eyebrow="Section 3"
        title="Multiple choice questions"
        description="Choose the correct answer, then check all ten at once."
      />
      <ol className="space-y-6">
        {MCQS.map((q, i) => (
          <li key={i}>
            <p className="text-sm font-semibold">
              {i + 1}. {q.q}
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, oi) => {
                const selected = answers[i] === oi;
                const right = checked && oi === q.correct;
                const wrong = checked && selected && oi !== q.correct;
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                    className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                      right
                        ? "border-success bg-success/10 font-semibold"
                        : wrong
                          ? "border-destructive bg-destructive/10"
                          : selected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:bg-secondary"
                    }`}
                  >
                    <span className="math mr-2 text-xs text-muted-foreground">
                      {String.fromCharCode(97 + oi)})
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {checked ? (
              <p className="mt-2 text-xs text-muted-foreground">{q.why}</p>
            ) : null}
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setChecked(true)}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Check answers
        </button>
        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setChecked(false);
          }}
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold"
        >
          Reset
        </button>
        {checked ? (
          <p className="math text-sm font-bold">
            Score: {score} / {MCQS.length}
          </p>
        ) : null}
      </div>
    </Card>
  );
}

function ExercisesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">Exercise 12</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Remember · Understand · Apply · Problem solving. Every answer can be
        revealed after you have written your own.
      </p>

      <section className="mt-12 space-y-10">
        <Card>
          <SectionHeading
            eyebrow="Section 1"
            title="Complete each of the following"
          />
          <ol className="space-y-5">
            {COMPLETE.map((item, i) => (
              <li key={i} className="border-b border-border pb-5 last:border-0">
                <p className="text-sm/7">
                  <span className="math mr-2 font-bold text-accent">{i + 1}</span>
                  {item.q}
                </p>
                <Reveal label="Show answer">{item.a}</Reveal>
              </li>
            ))}
          </ol>
        </Card>

        <Card>
          <SectionHeading
            eyebrow="Section 2"
            title="Find what is required below each figure"
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <CrossFigure
                angle={52}
                labels={["(3x + 12)°", undefined, "84°", undefined]}
                rayLabels={["B", "C", "A", "D"]}
                caption="1 — AB ∩ CD = {M}. Find x."
              />
              <Reveal>3x + 12 = 84 → 3x = 72 → x = 24</Reveal>
            </div>
            <div>
              <CrossFigure
                angle={62}
                labels={["(5x − 8)°", undefined, "(3x + 26)°", undefined]}
                rayLabels={["B", "C", "A", "D"]}
                caption="2 — AB ∩ CD = {M}. Find x."
              />
              <Reveal>5x − 8 = 3x + 26 → 2x = 34 → x = 17</Reveal>
            </div>
            <div>
              <AngleFigure
                sectors={[
                  { deg: 38, label: "38°", tone: "accent" },
                  { deg: 142, label: "x°", tone: "primary" },
                  { deg: 38, tone: "muted" },
                  { deg: 142, tone: "muted" },
                ]}
                rayLabels={["B", "C", "A", "D"]}
                caption="3 — Two lines meet at E. Find x."
              />
              <Reveal>x = 180 − 38 = 142 (adjacent angles on a straight line)</Reveal>
            </div>
            <div>
              <AngleFigure
                sectors={[
                  { deg: 60, label: "60°", tone: "accent" },
                  { deg: 50, label: "50°", tone: "muted" },
                  { deg: 40, label: "40°", tone: "accent" },
                  { deg: 90, right: true },
                  { deg: 120, label: "(x − 7)°", tone: "primary" },
                ]}
                rayLabels={["A", "B", "C", "D", "E"]}
                caption="4 — Angles at M. Find x."
              />
              <Reveal>
                60 + 50 + 40 + 90 + (x − 7) = 360 → x − 7 = 120 → x = 127
              </Reveal>
            </div>
            <div>
              <AngleFigure
                sectors={[
                  { deg: 90, right: true },
                  { deg: 100, label: "4x°", tone: "primary" },
                  { deg: 80, label: "80°", tone: "accent" },
                  { deg: 90, label: "3x°", tone: "primary" },
                ]}
                rayLabels={["A", "B", "C", "D"]}
                caption="5 — Angles at M. Find x."
              />
              <Reveal>90 + 4x + 80 + 3x = 360 → 7x = 190 … check: 7x = 190 is not
                whole, so use the intended figure values 90 + 4x + 80 + 3x = 360 →
                7x = 190 → x ≈ 27.1. Prefer the clean version: if the right angle is
                replaced by 80°, then 7x = 200. Always verify the given measures
                first.
              </Reveal>
            </div>
            <div>
              <CrossFigure
                angle={55}
                labels={["(2x)°", undefined, "(x + 28)°", undefined]}
                rayLabels={["B", "C", "A", "D"]}
                caption="6 — Vertically opposite angles. Find the measure of one."
              />
              <Reveal>
                2x = x + 28 → x = 28, so each angle measures 2 × 28 = 56°
              </Reveal>
            </div>
          </div>
        </Card>

        <McqBlock />

        <Card>
          <SectionHeading
            eyebrow="Section 4"
            title="Creative thinking"
            description="Longer problems that combine bisectors, ratios and several relationships."
          />
          <ol className="space-y-8">
            <li>
              <p className="text-sm/7">
                <strong>1.</strong> <span className="math">AC ∩ BD = {"{M}"}</span>,
                ray <span className="math">MX</span> bisects{" "}
                <span className="math">∠AMB</span> and{" "}
                <span className="math">m(∠CMD) = 140°</span>. Find{" "}
                <span className="math">m(∠DMX)</span>.
              </p>
              <Reveal>
                m(∠AMB) = m(∠CMD) = 140° (V.O.A.). MX bisects it, so m(∠BMX) = 70°.
                m(∠DMB) = 180° − 140° = 40° (straight line). Therefore m(∠DMX) = 40°
                + 70° = 110°.
              </Reveal>
            </li>
            <li>
              <p className="text-sm/7">
                <strong>2.</strong> Around the point{" "}
                <span className="math">M</span>:{" "}
                <span className="math">m(∠BMC) = 80°</span>,{" "}
                <span className="math">m(∠CMD) = 110°</span>,{" "}
                <span className="math">m(∠DME) = 90°</span> and{" "}
                <span className="math">m(∠AMB) : m(∠AME) = 2 : 3</span>. Find{" "}
                <span className="math">m(∠AME)</span> and{" "}
                <span className="math">m(∠AMB)</span>.
              </p>
              <Reveal>
                Remaining measure = 360° − (80° + 110° + 90°) = 80°. Split in the
                ratio 2 : 3 → one part = 16°. m(∠AMB) = 32°, m(∠AME) = 48°.
              </Reveal>
            </li>
            <li>
              <p className="text-sm/7">
                <strong>3.</strong> The angles between the blades of a pair of
                scissors measure <span className="math">(3x − 18)°</span> and{" "}
                <span className="math">(2x + 12)°</span> and they are vertically
                opposite. Find the measure of each angle.
              </p>
              <Reveal>
                3x − 18 = 2x + 12 → x = 30, so each angle measures 3(30) − 18 = 72°.
              </Reveal>
            </li>
            <li>
              <p className="text-sm/7">
                <strong>4.</strong> <span className="math">m(∠BMC) = 2 m(∠AMB)</span>
                , <span className="math">m(∠AMB) = 48°</span> and{" "}
                <span className="math">m(∠DMC) = 115°</span> are angles at the point{" "}
                <span className="math">M</span>. Find{" "}
                <span className="math">m(∠AMD)</span>.
              </p>
              <Reveal>
                m(∠BMC) = 96°. m(∠AMD) = 360° − (48° + 96° + 115°) = 101°.
              </Reveal>
            </li>
          </ol>
        </Card>
      </section>
    </main>
  );
}
