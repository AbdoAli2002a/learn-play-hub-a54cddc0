export type Sector = {
  /** size of the sector in degrees */
  deg: number;
  /** label drawn inside the sector, e.g. "129°" or "(2x − 7)°" */
  label?: string | undefined;
  /** highlight tone */
  tone?: "default" | "primary" | "accent" | "muted" | undefined;
  /** draw the small square right-angle marker instead of an arc */
  right?: boolean | undefined;
};

export type AngleFigureProps = {
  /** sectors going counter-clockwise, should add up to 360 */
  sectors: Sector[];
  /** angle (degrees, counter-clockwise from east) where the first ray starts */
  start?: number | undefined;
  /** labels for the rays, in the same order as the sector boundaries */
  rayLabels?: string[] | undefined;
  /** label of the centre point */
  centerLabel?: string | undefined;
  size?: number | undefined;
  className?: string | undefined;
  caption?: string | undefined;
};

const toneStroke: Record<NonNullable<Sector["tone"]>, string> = {
  default: "var(--figure-line)",
  primary: "var(--color-primary)",
  accent: "var(--color-accent)",
  muted: "var(--figure-line)",
};

const toneFill: Record<NonNullable<Sector["tone"]>, string> = {
  default: "transparent",
  primary: "color-mix(in oklab, var(--color-primary) 16%, transparent)",
  accent: "color-mix(in oklab, var(--color-accent) 22%, transparent)",
  muted: "color-mix(in oklab, var(--figure-line) 8%, transparent)",
};

function pt(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy - r * Math.sin(a)] as const;
}

export function AngleFigure({
  sectors,
  start = 0,
  rayLabels = [],
  centerLabel = "M",
  size = 260,
  className,
  caption,
}: AngleFigureProps) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 30;

  let cursor = start;
  const bounds: number[] = [];
  for (const s of sectors) {
    bounds.push(cursor);
    cursor += s.deg;
  }

  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        height="auto"
        role="img"
        aria-label={caption ?? "Geometry figure"}
        className="mx-auto max-w-[300px]"
      >
        {sectors.map((s, i) => {
          const a0 = bounds[i] ?? 0;
          const a1 = a0 + s.deg;
          const arcR = Math.min(R * 0.42, 34 + (i % 2) * 8);
          const [x0, y0] = pt(cx, cy, arcR, a0);
          const [x1, y1] = pt(cx, cy, arcR, a1);
          const large = s.deg > 180 ? 1 : 0;
          const tone = s.tone ?? "default";
          if (s.right) {
            const m = arcR * 0.62;
            const [ax, ay] = pt(cx, cy, m, a0);
            const [bx, by] = pt(cx, cy, m, a1);
            return (
              <path
                key={`s${i}`}
                d={`M ${ax} ${ay} L ${ax + bx - cx} ${ay + by - cy} L ${bx} ${by}`}
                fill="none"
                stroke={toneStroke[tone]}
                strokeWidth={2}
              />
            );
          }
          return (
            <path
              key={`s${i}`}
              d={`M ${cx} ${cy} L ${x0} ${y0} A ${arcR} ${arcR} 0 ${large} 0 ${x1} ${y1} Z`}
              fill={toneFill[tone]}
              stroke={toneStroke[tone]}
              strokeWidth={1.75}
            />
          );
        })}

        {bounds.map((b, i) => {
          const [x, y] = pt(cx, cy, R, b);
          return (
            <line
              key={`r${i}`}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="var(--figure-line)"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          );
        })}

        {sectors.map((s, i) => {
          if (!s.label) return null;
          const mid = (bounds[i] ?? 0) + s.deg / 2;
          const [x, y] = pt(cx, cy, Math.min(R * 0.72, 66), mid);
          return (
            <text
              key={`l${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-[var(--figure-label)] text-[13px] font-semibold"
              style={{ fontFamily: "var(--font-mono-figure)" }}
            >
              {s.label}
            </text>
          );
        })}

        {bounds.map((b, i) => {
          const name = rayLabels[i];
          if (!name) return null;
          const [x, y] = pt(cx, cy, R + 14, b);
          return (
            <text
              key={`rl${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-[var(--figure-point)] text-[14px] font-bold"
            >
              {name}
            </text>
          );
        })}

        <circle cx={cx} cy={cy} r={4} className="fill-[var(--figure-point)]" />
        <text
          x={cx - 12}
          y={cy + 16}
          className="fill-[var(--figure-point)] text-[14px] font-bold"
        >
          {centerLabel}
        </text>
      </svg>
      {caption ? (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Two straight lines crossing at M, giving two pairs of vertically opposite angles. */
export function CrossFigure({
  angle = 55,
  labels = [],
  rayLabels = ["B", "C", "A", "D"],
  size = 260,
  caption,
  className,
}: {
  angle?: number;
  labels?: (string | undefined)[];
  rayLabels?: string[] | undefined;
  size?: number;
  caption?: string;
  className?: string;
}) {
  const sectors: Sector[] = [
    { deg: angle, label: labels[0], tone: labels[0] ? "primary" : "default" },
    { deg: 180 - angle, label: labels[1], tone: labels[1] ? "accent" : "default" },
    { deg: angle, label: labels[2], tone: labels[2] ? "primary" : "default" },
    { deg: 180 - angle, label: labels[3], tone: labels[3] ? "accent" : "default" },
  ];
  return (
    <AngleFigure
      sectors={sectors}
      start={0}
      rayLabels={rayLabels}
      size={size}
      caption={caption}
      className={className}
    />
  );
}
