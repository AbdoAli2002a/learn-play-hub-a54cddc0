import { createFileRoute } from "@tanstack/react-router";
import { AngleFigure, CrossFigure } from "@/components/geometry/AngleFigure";
import { Card, SectionHeading } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/examples")({
  head: () => ({
    meta: [
      { title: "Worked Examples — Angle Relationships" },
      {
        name: "description",
        content:
          "Step-by-step model solutions for vertically opposite angles and angles at a point, plus try-it-yourself tasks with answers.",
      },
      { property: "og:title", content: "Worked Examples — Angle Relationships" },
      {
        property: "og:description",
        content:
          "Model solutions and practice tasks for finding unknown angles and values of x.",
      },
    ],
  }),
  component: ExamplesPage,
});

function Step({ children }: { children: React.ReactNode }) {
  return <p className="math text-sm/7">{children}</p>;
}

function ExamplesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">Worked Examples</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Each example shows the reasoning line by line. Read the model solution,
        then close it and complete the matching “Try it yourself” task.
      </p>

      <section className="mt-12 space-y-10">
        {/* Example 1 */}
        <Card>
          <SectionHeading eyebrow="Example 1" title="Find the value of x" />
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <CrossFigure
              angle={51}
              labels={["129°", undefined, "(2x − 7)°", undefined]}
              rayLabels={["B", "C", "A", "D"]}
              caption="AB ∩ CD = {M}"
            />
            <div>
              <p className="text-sm/7">
                In the opposite figure, <span className="math">AB ∩ CD = {"{M}"}</span>.
                Find the value of <span className="math">x</span>.
              </p>
              <div className="mt-4 space-y-1 rounded-xl bg-secondary/70 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  Solution
                </p>
                <Step>m(∠DMB) = m(∠AMC) — vertically opposite angles</Step>
                <Step>2x − 7 = 129</Step>
                <Step>2x = 129 + 7 = 136</Step>
                <Step>x = 136 ÷ 2 = 68</Step>
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-8 rounded-xl border border-dashed border-primary/40 p-5 md:grid-cols-2 md:items-center">
            <CrossFigure
              angle={49}
              labels={["67°", undefined, "(4x − 1)°", undefined]}
              rayLabels={["Y", "L", "X", "Z"]}
              caption="XY ∩ LZ = {M}"
            />
            <div>
              <p className="text-sm font-bold">Try it yourself 1</p>
              <p className="mt-2 text-sm/7">
                In the opposite figure <span className="math">XY ∩ LZ = {"{M}"}</span>.
                Find the value of <span className="math">x</span>.
              </p>
              <Reveal>
                <Step>4x − 1 = 67 (vertically opposite angles)</Step>
                <Step>4x = 68</Step>
                <Step>x = 17</Step>
              </Reveal>
            </div>
          </div>
        </Card>

        {/* Example 2 */}
        <Card>
          <SectionHeading
            eyebrow="Example 2"
            title="Find several angle measures in one figure"
          />
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <AngleFigure
              sectors={[
                { deg: 28, label: "28°", tone: "accent" },
                { deg: 115, label: "115°", tone: "primary" },
                { deg: 37, label: "?", tone: "muted" },
                { deg: 180, tone: "default" },
              ]}
              start={0}
              rayLabels={["B", "C", "E", "A"]}
              centerLabel="M"
              caption="BE ∩ AD = {M}, with ray MC between them"
            />
            <div>
              <p className="text-sm/7">
                Find <span className="math">m(∠AMB)</span>,{" "}
                <span className="math">m(∠DME)</span> and{" "}
                <span className="math">m(∠AME)</span>.
              </p>
              <div className="mt-4 space-y-1 rounded-xl bg-secondary/70 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  Solution
                </p>
                <Step>m(∠AMB) = 180° − (115° + 28°) = 37° (straight line)</Step>
                <Step>m(∠DME) = m(∠AMB) = 37° (vertically opposite angles)</Step>
                <Step>m(∠AME) = m(∠BMD) = 28° + 115° = 143° (V.O.A.)</Step>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Check: 37° + 143° = 180°, as the two angles lie on a straight line.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-xl border border-dashed border-primary/40 p-5">
            <p className="text-sm font-bold">Try it yourself 2</p>
            <p className="mt-2 text-sm/7">
              Two straight lines <span className="math">AB</span> and{" "}
              <span className="math">CD</span> intersect at{" "}
              <span className="math">M</span>, and the ray{" "}
              <span className="math">ME</span> lies inside{" "}
              <span className="math">∠BMD</span> so that{" "}
              <span className="math">m(∠CMA) = 70°</span> and{" "}
              <span className="math">m(∠BME) = 120° − 70° = 50°</span>. Find{" "}
              <span className="math">m(∠CMB)</span> and{" "}
              <span className="math">m(∠EMD)</span>.
            </p>
            <Reveal>
              <Step>m(∠CMB) = 180° − 70° = 110° (straight line AB)</Step>
              <Step>m(∠BMD) = m(∠CMA) = 70° (vertically opposite angles)</Step>
              <Step>m(∠EMD) = 70° − 50° = 20°</Step>
            </Reveal>
          </div>
        </Card>

        {/* Example 3 */}
        <Card>
          <SectionHeading
            eyebrow="Example 3"
            title="Angles accumulated at a point"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            <div>
              <AngleFigure
                sectors={[
                  { deg: 90, right: true },
                  { deg: 150, label: "150°", tone: "accent" },
                  { deg: 120, label: "?", tone: "primary" },
                ]}
                rayLabels={["A", "B", "C"]}
                caption="Figure 1 — find m(∠BMC)"
              />
              <div className="mt-3 rounded-lg bg-secondary/70 p-4">
                <Step>m(∠BMC) = 360° − (90° + 150°) = 120°</Step>
              </div>
            </div>
            <div>
              <AngleFigure
                sectors={[
                  { deg: 140, label: "140°", tone: "accent" },
                  { deg: 50, label: "50°", tone: "muted" },
                  { deg: 100, label: "100°", tone: "accent" },
                  { deg: 35, label: "?", tone: "primary" },
                  { deg: 35, label: "?", tone: "primary" },
                ]}
                rayLabels={["A", "E", "D", "C", "B"]}
                caption="Figure 2 — find m(∠AMB) where MB bisects ∠AMC"
              />
              <div className="mt-3 rounded-lg bg-secondary/70 p-4">
                <Step>m(∠AMC) = 360° − (140° + 50° + 100°) = 70°</Step>
                <Step>m(∠AMB) = m(∠BMC) = 70° ÷ 2 = 35°</Step>
              </div>
            </div>
            <div>
              <AngleFigure
                sectors={[
                  { deg: 90, right: true },
                  { deg: 110, label: "110°", tone: "accent" },
                  { deg: 115, label: "5x°", tone: "primary" },
                  { deg: 45, label: "(2x − 1)°", tone: "primary" },
                ]}
                rayLabels={["A", "B", "C", "D"]}
                caption="Figure 3 — find the value of x"
              />
              <div className="mt-3 rounded-lg bg-secondary/70 p-4">
                <Step>2x − 1 + 90 + 5x + 110 = 360</Step>
                <Step>7x + 199 = 360</Step>
                <Step>7x = 161 → x = 23</Step>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 rounded-xl border border-dashed border-primary/40 p-5 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold">Try it yourself 3 — part 1</p>
              <AngleFigure
                sectors={[
                  { deg: 86, label: "86°", tone: "accent" },
                  { deg: 54, label: "54°", tone: "muted" },
                  { deg: 90, right: true },
                  { deg: 130, label: "?", tone: "primary" },
                ]}
                rayLabels={["B", "C", "D", "A"]}
                caption="Find m(∠AMD)"
              />
              <Reveal>
                <Step>m(∠AMD) = 360° − (86° + 54° + 90°) = 130°</Step>
              </Reveal>
            </div>
            <div>
              <p className="text-sm font-bold">Try it yourself 3 — part 2</p>
              <AngleFigure
                sectors={[
                  { deg: 110, label: "110°", tone: "accent" },
                  { deg: 70, label: "70°", tone: "muted" },
                  { deg: 60, label: "3x°", tone: "primary" },
                  { deg: 120, label: "(2x + 20)°", tone: "primary" },
                ]}
                rayLabels={["B", "C", "D", "A"]}
                caption="Find the value of x"
              />
              <Reveal>
                <Step>110 + 70 + 3x + 2x + 20 = 360</Step>
                <Step>5x + 200 = 360 → 5x = 160</Step>
                <Step>x = 32</Step>
              </Reveal>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
