import { createFileRoute, Link } from "@tanstack/react-router";
import { AngleFigure, CrossFigure } from "@/components/geometry/AngleFigure";
import { Card, RuleBox, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/lesson")({
  head: () => ({
    meta: [
      { title: "The Lesson — Vertically Opposite Angles & Angles at a Point" },
      {
        name: "description",
        content:
          "Full explanation of vertically opposite angles and accumulative angles at a point, with annotated diagrams and common mistakes.",
      },
      { property: "og:title", content: "The Lesson — Angle Relationships" },
      {
        property: "og:description",
        content:
          "Definitions, rules and annotated diagrams for vertically opposite angles and angles around a point.",
      },
    ],
  }),
  component: LessonPage,
});

function LessonPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">
        Continue to Angle Relationships
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Two ideas, taught in order: what happens when two straight lines cross,
        and what happens when several rays share one starting point.
      </p>

      {/* Part 1 */}
      <section className="mt-14">
        <SectionHeading
          eyebrow="Part 1"
          title="The Vertically Opposite Angles"
          description="Vertically opposite angles are two non-adjacent angles formed by the intersection of two straight lines."
        />

        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <Card>
            <CrossFigure
              angle={58}
              labels={["1", "2", "3", "4"]}
              rayLabels={["B", "C", "A", "D"]}
              caption="Lines AB and CD intersect at M"
            />
          </Card>
          <div className="space-y-5">
            <p className="text-sm/7">
              In the figure, straight line <span className="math">AB</span> meets
              straight line <span className="math">CD</span> at the point{" "}
              <span className="math">M</span>. Four angles are created. Two angles
              that sit <em>across</em> the vertex from each other — sharing only the
              point <span className="math">M</span> and no ray — are vertically
              opposite.
            </p>
            <ul className="space-y-2 text-sm/7">
              <li>
                • Angles <span className="math">∠AMC</span> and{" "}
                <span className="math">∠BMD</span> are vertically opposite (angles
                1 and 3).
              </li>
              <li>
                • Angles <span className="math">∠AMD</span> and{" "}
                <span className="math">∠BMC</span> are vertically opposite (angles
                2 and 4).
              </li>
              <li>
                • Neighbouring angles such as <span className="math">∠AMC</span>{" "}
                and <span className="math">∠AMD</span> are <em>adjacent</em>, not
                vertically opposite — together they form a straight angle of 180°.
              </li>
            </ul>
            <RuleBox title="Rule 1">
              The two vertically opposite angles are congruent (equal in measure):
              <br />
              <span className="math font-semibold">
                m(∠AMD) = m(∠BMC) and m(∠AMC) = m(∠BMD)
              </span>
            </RuleBox>
          </div>
        </div>

        <Card className="mt-8">
          <h3 className="text-lg font-bold">Why is it true?</h3>
          <p className="mt-3 max-w-3xl text-sm/7">
            <span className="math">∠AMC</span> and{" "}
            <span className="math">∠AMD</span> lie on the straight line{" "}
            <span className="math">CD</span>, so their measures add to 180°. In the
            same way <span className="math">∠AMD</span> and{" "}
            <span className="math">∠BMD</span> lie on the straight line{" "}
            <span className="math">AB</span>, so they also add to 180°. Both pairs
            share <span className="math">∠AMD</span>, therefore:
          </p>
          <p className="math mt-4 rounded-lg bg-secondary/70 p-4 text-sm font-semibold">
            m(∠AMC) = 180° − m(∠AMD) = m(∠BMD)
          </p>
        </Card>
      </section>

      {/* Part 2 */}
      <section className="mt-16">
        <SectionHeading
          eyebrow="Part 2"
          title="The Accumulative Angles at a Point"
          description="Rays that share one starting point split the full turn around that point into angles."
        />

        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="space-y-5">
            <p className="text-sm/7">
              If <span className="math">MA</span>, <span className="math">MB</span>{" "}
              and <span className="math">MC</span> are rays that have the same
              starting point <span className="math">M</span>, then{" "}
              <span className="math">∠AMB</span>, <span className="math">∠BMC</span>{" "}
              and <span className="math">∠CMA</span> are called accumulative angles
              at the point <span className="math">M</span>.
            </p>
            <RuleBox title="Rule 2">
              The sum of the measures of accumulative angles at a point is equal to
              360°:
              <br />
              <span className="math font-semibold">
                m(∠AMB) + m(∠BMC) + m(∠CMA) = 360°
              </span>
            </RuleBox>
            <p className="text-sm/7">
              This works for any number of angles — three rays, four rays or ten
              rays. One complete turn is always 360°, so a missing angle is found by
              subtracting all the known angles from 360°.
            </p>
            <div className="rounded-xl border border-border p-5">
              <h3 className="font-bold">Useful partial sums</h3>
              <ul className="math mt-3 space-y-1 text-sm">
                <li>Straight angle = 180° (half a turn)</li>
                <li>Right angle = 90° (quarter turn)</li>
                <li>Full turn = 360° = 4 right angles</li>
              </ul>
            </div>
          </div>
          <Card>
            <AngleFigure
              sectors={[
                { deg: 130, label: "∠AMB", tone: "primary" },
                { deg: 115, label: "∠BMC", tone: "accent" },
                { deg: 115, label: "∠CMA", tone: "muted" },
              ]}
              start={15}
              rayLabels={["A", "B", "C"]}
              caption="Three rays from M: the three angles total 360°"
            />
          </Card>
        </div>
      </section>

      {/* Combining */}
      <section className="mt-16">
        <SectionHeading
          eyebrow="Part 3"
          title="Combining the two rules"
          description="Exam figures usually mix a straight line, a right angle and a pair of vertically opposite angles."
        />
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <AngleFigure
              sectors={[
                { deg: 40, label: "40°", tone: "primary" },
                { deg: 140, label: "140°", tone: "accent" },
                { deg: 40, label: "x°", tone: "primary" },
                { deg: 140, label: "y°", tone: "accent" },
              ]}
              rayLabels={["B", "C", "A", "D"]}
              caption="x = 40 (V.O.A.) and y = 140 (V.O.A.)"
            />
          </Card>
          <Card>
            <AngleFigure
              sectors={[
                { deg: 90, right: true },
                { deg: 150, label: "150°", tone: "accent" },
                { deg: 120, label: "?", tone: "primary" },
              ]}
              start={0}
              rayLabels={["A", "B", "C"]}
              caption="? = 360° − (90° + 150°) = 120°"
            />
          </Card>
          <Card>
            <AngleFigure
              sectors={[
                { deg: 70, label: "70°", tone: "accent" },
                { deg: 110, label: "2x°", tone: "primary" },
                { deg: 70, label: "70°", tone: "accent" },
                { deg: 110, label: "2x°", tone: "primary" },
              ]}
              rayLabels={["B", "C", "A", "D"]}
              caption="70° + 2x = 180° → x = 55"
            />
          </Card>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-bold">Common mistakes to avoid</h2>
          <ul className="mt-4 space-y-3 text-sm/6">
            <li>
              ✗ Treating two <em>adjacent</em> angles as vertically opposite. They
              add to 180°, they are not equal (unless both are 90°).
            </li>
            <li>
              ✗ Using 180° instead of 360° when several rays surround a point.
            </li>
            <li>
              ✗ Forgetting to substitute back: after solving for{" "}
              <span className="math">x</span>, check whether the question asked for{" "}
              <span className="math">x</span> or for the angle measure.
            </li>
            <li>
              ✗ Ignoring the small square marker — it always means exactly 90°.
            </li>
          </ul>
        </Card>
        <Card>
          <h2 className="text-xl font-bold">A reliable method</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm/6">
            <li>Mark every known measure on the figure.</li>
            <li>Decide the relationship: straight line (180°), point (360°) or V.O.A. (equal).</li>
            <li>Write one equation from that relationship.</li>
            <li>Solve for the unknown and simplify.</li>
            <li>Re-read the question and state exactly what was asked.</li>
          </ol>
          <Link
            to="/examples"
            className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            See the method used in examples →
          </Link>
        </Card>
      </section>
    </main>
  );
}
