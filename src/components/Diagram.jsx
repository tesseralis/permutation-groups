import { schemeCategory10 } from "d3-scale-chromatic";
import {
  parseCycleNotation,
  generatorsToString,
  generatorToString,
  cycleToString,
  applyGenerator,
  pointsFromGenerators,
  cyclePairs,
  randomize,
} from "../util";
import _ from "lodash";
import tinycolor from "tinycolor2";

export default function Diagram({
  generators,
  applyGenerator,
  points,
  hoveredCycle,
  setHoveredCycle,
}) {
  const n = points.length;
  const radius = 250;
  const hasSelection = !!hoveredCycle;
  const selectedPoints = getSelectedPoints(generators, hoveredCycle);
  const selectedColor = hoveredCycle
    ? schemeCategory10[hoveredCycle[0]]
    : "lightgrey";
  return (
    <svg
      className="Diagram"
      width={600}
      height={600}
      viewBox="-300 -300 600 600"
      data-has-selection={hasSelection}
      style={{
        "--selected-color": selectedColor,
      }}
    >
      {generators.map((generator, j) => {
        return (
          <g
            key={j}
            style={{
              "--operation-color": schemeCategory10[j],
              "--operation-hl": brightenColor(schemeCategory10[j]),
            }}
          >
            {generator.map((cycle, k) => {
              const isHovered =
                hoveredCycle &&
                hoveredCycle[0] === j &&
                (_.isNil(hoveredCycle[1]) || hoveredCycle[1] === k);
              const isInverse = isHovered && !!hoveredCycle[2];
              const polygonPoints = cycle
                .map((i) => {
                  const [x, y] = getCoordinates(i, n, radius);
                  return `${x},${y}`;
                })
                .join(" ");
              return (
                <g
                  key={cycleToString(cycle)}
                  className="cycle"
                  data-selected={isHovered}
                  data-inverse={isInverse}
                >
                  <polygon
                    className="path"
                    stroke="currentColor"
                    fill="none"
                    points={polygonPoints}
                  />

                  {cycle.length > 2 &&
                    cyclePairs(cycle).map(([a, b]) => {
                      const u = getCoordinates(a, n, radius);
                      const v = getCoordinates(b, n, radius);
                      const position = midpoint(u, v);
                      const angle =
                        (Math.atan2(u[1] - v[1], u[0] - v[0]) / (2 * Math.PI)) *
                        360;
                      const arrowRad = 5;
                      return (
                        <g
                          key={a+' '+b}
                          transform={`translate(${position[0]}, ${position[1]})rotate(${angle})`}
                        >
                          <polygon
                            className="arrow"
                            points={`-${arrowRad},0 ${arrowRad},${arrowRad} ${arrowRad},-${arrowRad}`}
                            fill="currentColor"
                          />
                        </g>
                      );
                    })}
                  <polygon
                    className="hoverZone"
                    stroke="transparent"
                    strokeWidth={7.5}
                    fill="none"
                    points={polygonPoints}
                    onMouseOver={() => setHoveredCycle([j])}
                    onMouseOut={() => setHoveredCycle(null)}
                    onClick={() => applyGenerator(generators[j], points)}
                  />
                </g>
              );
            })}
          </g>
        );
      })}
      {_.range(1, points.length + 1).map((p) => {
        const isSelected = selectedPoints.includes(p);
        const [x, y] = getCoordinates(p, n, radius);
        return (
          <g key={p} transform={`translate(${x}, ${y})`}>
            <circle className="slot" data-selected={isSelected} r={20}></circle>
            <circle fill="lightgrey" r={20}></circle>
          </g>
        );
      })}
      {points.map((i, _p) => {
        const p = _p + 1;
        const [x, y] = getCoordinates(i, n, radius);
        return (
          <g
            className="point"
            key={p}
            style={{ transform: `translate(${x}px,${y}px)` }}
          >
            <circle stroke="grey" strokeWidth={1} fill={`aliceblue`} r={20}></circle>
            <text textAnchor="middle" dominantBaseline="middle">
              {p}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function getCoordinates(i, n, radius) {
  const x = Math.round(radius * Math.cos(((i - 1) * 2 * Math.PI) / n - Math.PI / 2));
  const y = Math.round(radius * Math.sin(((i - 1) * 2 * Math.PI) / n - Math.PI / 2));
  return [x, y];
}

function midpoint(u, v) {
  return [(u[0] + v[0]) / 2, (u[1] + v[1]) / 2];
}

function brightenColor(color) {
  return tinycolor(color).brighten(15).toHexString();
}

function getSelectedPoints(generators, selected) {
  if (!selected) {
    return [];
  }
  const gen = generators[selected[0]];
  if (_.isNil(selected[1])) {
    return gen.flat();
  }
  return gen[selected[1]];
}
