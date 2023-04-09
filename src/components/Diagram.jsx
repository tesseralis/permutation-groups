import { schemeCategory10 } from "d3-scale-chromatic";
import {
  parseCycleNotation,
  generatorsToString,
  generatorToString,
  applyGenerator,
  pointsFromGenerators,
  cyclePairs,
  randomize,
} from "../util";
import _ from "lodash";
import tinycolor from "tinycolor2"

export default function Diagram({ generators, points, hoveredCycle }) {
  const n = points.length;
  const radius = 250;
  return (
    <svg
      className="Diagram"
      width={600}
      height={600}
      viewBox="-300 -300 600 600"
    >
      {generators.map((generator, j) => {
        return (
          <g color={schemeCategory10[j]}>
            {generator.map((cycle, k) => {
              const isHovered = hoveredCycle && (hoveredCycle[0] === j && hoveredCycle[1] === k)
              return (
                <g color={isHovered ? brightenColor(schemeCategory10[j]) : 'inherit'}>
                  <polygon
                    stroke="currentColor"
                    strokeWidth={2}
                    fill="none"
                    points={cycle
                      .map((i) => {
                        const [x, y] = getCoordinates(i, n, radius - 2 * j);
                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />
                  {cycle.length > 2 &&
                    cyclePairs(cycle).map(([a, b]) => {
                      const u = getCoordinates(a, n, radius - 2 * j);
                      const v = getCoordinates(b, n, radius - 2 * j);
                      const position = midpoint(u, v);
                      const angle =
                        (Math.atan2(u[1] - v[1], u[0] - v[0]) / (2 * Math.PI)) *
                        360;
                      const arrowRad = 5;
                      return (
                        <g
                          transform={`translate(${position[0]}, ${position[1]})rotate(${angle})`}
                        >
                          <polygon
                            points={`-${arrowRad},0 ${arrowRad},${arrowRad} ${arrowRad},-${arrowRad}`}
                            fill="currentColor"
                          />
                        </g>
                      );
                    })}
                </g>
              );
            })}
          </g>
        );
      })}
      {_.range(1, points.length + 1).map((p) => {
        const [x, y] = getCoordinates(p, n, radius);
        return <circle cx={x} cy={y} fill="lightgrey" r={20}></circle>;
      })}
      {points.map((i, _p) => {
        const p = _p + 1;
        const [x, y] = getCoordinates(i, n, radius);
        return (
          <g
            className="Point"
            key={p}
            style={{ transform: `translate(${x}px,${y}px)` }}
          >
            <circle stroke="grey" strokeWidth={1} fill="white" r={20}></circle>
            <text textAnchor="middle" dominantBaseline="middle">
              {p}
            </text>
          </g>
        );
      })}
      {_.range(1, points.length + 1).map((i) => {
        const [x, y] = getCoordinates(i, n, radius + 30);
        return (
          <g key={i} style={{ transform: `translate(${x}px,${y}px)` }}>
            <text textAnchor="middle" dominantBaseline="middle">
              {i}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function getCoordinates(i, n, radius) {
  const x = radius * Math.cos(((i - 1) * 2 * Math.PI) / n - Math.PI / 2);
  const y = radius * Math.sin(((i - 1) * 2 * Math.PI) / n - Math.PI / 2);
  return [x, y];
}

function midpoint(u, v) {
  return [(u[0] + v[0]) / 2, (u[1] + v[1]) / 2];
}

function brightenColor(color) {
  return tinycolor(color).brighten().toHexString();
}
