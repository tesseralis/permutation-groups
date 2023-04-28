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
  coordinates = getDefaultCoordinates(points.length),
  setCoordinates,
}) {
  const n = points.length;
  const radius = 250;
  const hasSelection = !!hoveredCycle;
  const selectedPoints = getSelectedPoints(generators, hoveredCycle);
  const slotRadius = Math.min(20, 20 * 25 / n)
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
                  const {x, y} = coordinates[i];
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
                      const u = coordinates[a];
                      const v = coordinates[b];
                      const position = midpoint(u, v);
                      const angle =
                        (Math.atan2(u.y - v.y, u.x - v.x) / (2 * Math.PI)) *
                        360;
                      const arrowRad = 5;
                      return (
                        <g
                          key={a + " " + b}
                          transform={`translate(${position.x}, ${position.y})rotate(${angle})`}
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
        const {x, y} = coordinates[p];
        return (
          <g key={p} transform={`translate(${x}, ${y})`}>
            <circle className="slot" data-selected={isSelected} r={slotRadius}></circle>
            <circle fill="lightgrey" r={slotRadius}></circle>
          </g>
        );
      })}
      {points.map((i, _p) => {
        const p = _p + 1;
        const {x, y} = coordinates[p];
        return (
          <g
            className="point"
            key={p}
            style={{ transform: `translate(${x}px,${y}px)` }}
          >
            <circle
              stroke="grey"
              strokeWidth={1}
              fill={`aliceblue`}
              r={slotRadius}
            ></circle>
            <text textAnchor="middle" dominantBaseline="middle">
              {p}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function getDefaultCoordinates(n) {
  const radius = 250;
  return [, ..._.range(1, n + 1).map((i) => getCoordinates(i, n, radius))];
}

function getCoordinates(i, n, radius) {
  const x = Math.round(
    radius * Math.cos(((i - 1) * 2 * Math.PI) / n - Math.PI / 2)
  );
  const y = Math.round(
    radius * Math.sin(((i - 1) * 2 * Math.PI) / n - Math.PI / 2)
  );
  return {x, y};
}

function midpoint(u, v) {
  return {x: (u.x + v.x) / 2, y: (u.y + v.y) / 2};
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
