import * as React from "react";

export default function DiagramPage() {
  return <div className="DiagramPage">
    <Sidebar />
    <Diagram />
  </div>;
}

function Sidebar() {
  return <section />
}

function Diagram() {
  const n = 12;
  const radius = 250;
  return (
    <svg width={600} height={600} viewBox="-300 -300 600 600">
      {[...Array(n).keys()].map((i) => {
        const x = radius * Math.cos((i * 2 * Math.PI) / n);
        const y = radius * Math.sin((i * 2 * Math.PI) / n);

        return (
          <g transform={`translate(${x}, ${y})`}>
            <circle stroke="grey" strokeWidth={1} fill="none" r={20}></circle>
            <text textAnchor="middle" dominantBaseline="middle">
              {i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
