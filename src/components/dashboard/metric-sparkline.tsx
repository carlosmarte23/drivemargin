type MetricSparklineProps = {
  data: {
    date: string;
    label: string;
    value: number;
  }[];
};

type sparklinePoint = {
  x: number;
  y: number;
};

const viewBoxWidth = 180;
const viewBoxHeight = 56;
const padding = 4;

export function MetricSparkline({ data }: MetricSparklineProps) {
  if (data.length === 0) {
    return null;
  }

  const points = buildSparklinePoints(data);

  if (points.length === 0) {
    return null;
  }

  const singlePoint = points.length === 1 ? points[0] : null;
  const path = singlePoint ? "" : buildSmoothPath(points);

  const zeroLineY = getYPosition({
    value: 0,
    min: Math.min(...data.map((point) => point.value), 0),
    max: Math.max(...data.map((point) => point.value), 0),
  });

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <line
        x1={0}
        x2={viewBoxWidth}
        y1={zeroLineY}
        y2={zeroLineY}
        stroke="currentColor"
        strokeDasharray="2 2"
        opacity={0.2}
        vectorEffect="non-scaling-stroke"
      />

      {singlePoint ? (
        <circle
          cx={singlePoint.x}
          cy={singlePoint.y}
          r={2.5}
          fill="currentColor"
        />
      ) : (
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}

function buildSparklinePoints(data: MetricSparklineProps["data"]) {
  const values = data.map((point) => point.value);
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 0);

  return data.map((point, index) => {
    const x =
      data.length === 1
        ? viewBoxWidth / 2
        : padding +
          (index / Math.max(data.length - 1, 1)) * (viewBoxWidth - padding * 2);
    const y = getYPosition({ value: point.value, min, max });

    return { x, y };
  });
}

function buildSmoothPath(points: sparklinePoint[]) {
  const firstPoint = points[0];

  if (!firstPoint) {
    return "";
  }

  return points.reduce((path, point, index) => {
    if (index === 0) {
      return `M${point.x},${point.y}`;
    }

    const previousPoint = points[index - 1];
    const controlX = (previousPoint.x + point.x) / 2;

    return [
      path,
      `C ${controlX} ${previousPoint.y}`,
      `${controlX} ${point.y}`,
      `${point.x} ${point.y}`,
    ].join(" ");
  }, "");
}
function getYPosition({
  value,
  min,
  max,
}: {
  value: number;
  min: number;
  max: number;
}) {
  const range = max - min || 1;

  return (
    viewBoxHeight -
    padding -
    ((value - min) / range) * (viewBoxHeight - padding * 2)
  );
}
