import { createFileRoute, Link } from "@tanstack/react-router";
import { CrossFigure, AngleFigure } from "@/components/geometry/AngleFigure";
import { Card, Pill } from "@/components/site/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Angle Relationships — Lesson Two Overview" },
      {
        name: "description",
        content:
          "Learn vertically opposite angles and accumulative angles at a point with clear diagrams, worked examples, exercises and games.",
      },
      { property: "og:title", content: "Angle Relationships — Lesson Two" },
      {
        property: "og:description",
        content:
          "Diagrams, worked examples, exercises and learning games for angle relationships.",
      },
    ],
  }),
  component: Index,
});

const OUTCOMES = [
  "Identify vertically opposite angles formed by two intersecting straight lines.",
  "Use the fact that vertically opposite angles are congruent to find unknown measures.",
  "Recognise accumulative angles at a point and use the 360° sum.",
  "Solve equations in x that come from angle relationships in a figure.",
];

const MAP = [
  {
    to: "/lesson" as const,
    step: "01",
    title: "The Lesson",
    text: "Definitions, rules and annotated diagrams for both angle relationships.",
  },
  {
    to: "/examples" as const,
    step: "02",
    title: "Worked Examples",
    text: "Step-by-step model solutions plus 'Try it yourself' tasks with hidden answers.",
  },
  {
    to: "/exercises" as const,
    step: "03",
    title: "Exercises",
    text: "Completion items, find-the-value-of-x figures, multiple choice and creative thinking.",
  },
  {
    to: "/activities" as const,
    step: "04",
    title: "Activities & Games",
    text: "Timed quiz, 360° balance challenge and an unlimited find-x generator.",
  },
];

function Index() {
  return (
    <main>
      <section className="hero-surface grid-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div>
            <Pill>Unit 3 · Geometry and Measurement</Pill>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Lesson Two:
              <br />
              Continue to Angle Relationships
            </h1>
            <p className="mt-5 max-w-xl text-base/7 opacity-90">
              Two straight lines crossing at a point create angles that are never
              random — they follow two exact rules. This site explains those rules,
              shows how examiners use them, and lets you practise until they are
              automatic.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/lesson"
                className="rounded-lg bg-paper px-5 py-3 text-sm font-semibold text-primary shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Start the lesson
              </Link>
              <Link
                to="/activities"
                className="rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                Play the games
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-paper/95 p-6 text-ink shadow-xl">
            <CrossFigure
              angle={55}
              labels={["a", "b", "a", "b"]}
              rayLabels={["B", "C", "A", "D"]}
              caption="Vertically opposite angles are equal: a = a and b = b"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <h2 className="text-xl font-bold">Learning outcomes</h2>
            <ul className="mt-4 space-y-3">
              {OUTCOMES.map((o) => (
                <li key={o} className="flex gap-3 text-sm/6">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Key vocabulary</h2>
            <dl className="mt-4 space-y-4 text-sm/6">
              <div>
                <dt className="font-semibold text-primary">
                  Vertically Opposite Angles (V.O.A.)
                </dt>
                <dd className="text-muted-foreground">
                  Two non-adjacent angles formed by the intersection of two
                  straight lines. They are always congruent.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">
                  Accumulative Angles at a Point
                </dt>
                <dd className="text-muted-foreground">
                  Angles with the same vertex that completely surround the point.
                  Their measures add up to 360°.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Congruent angles</dt>
                <dd className="text-muted-foreground">
                  Angles that have exactly the same measure in degrees.
                </dd>
              </div>
            </dl>
          </Card>
        </div>

        <div className="mt-10 grid gap-6 rounded-2xl bg-secondary/50 p-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <AngleFigure
            sectors={[
              { deg: 120, label: "120°", tone: "primary" },
              { deg: 150, label: "150°", tone: "accent" },
              { deg: 90, right: true },
            ]}
            start={20}
            rayLabels={["A", "B", "C"]}
            caption="Angles around one point always total 360°"
          />
          <div>
            <h2 className="text-xl font-bold">The two rules in one line each</h2>
            <p className="mt-3 text-sm/7">
              <strong>Rule 1 —</strong> if two straight lines intersect, each pair
              of vertically opposite angles is equal.
              <br />
              <strong>Rule 2 —</strong> the measures of all angles accumulated at
              a point add up to <span className="math">360°</span>.
            </p>
            <p className="mt-3 text-sm/7 text-muted-foreground">
              Almost every exam question in this lesson is one of these two rules,
              sometimes combined with a straight angle of 180° or an angle
              bisector.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="text-2xl font-bold">Lesson map</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MAP.map((m) => (
            <Link key={m.to} to={m.to} className="group">
              <div className="card-surface h-full p-5 transition-transform group-hover:-translate-y-1">
                <span className="math text-xs font-bold text-accent">{m.step}</span>
                <h3 className="mt-2 text-lg font-bold">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
