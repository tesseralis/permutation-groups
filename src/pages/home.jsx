import * as React from "react";
import { parseCycleNotation } from "../util";
import { schemeCategory10 } from "d3-scale-chromatic";
import _ from 'lodash'

export default function DiagramPage() {
  // const [numElements, setNumElements] = React.useState(6);
  const [points, setPoints] = React.useState(_.range(1, 6+1))
  const [generators, setGenerators] = React.useState("(1 2 3)\n(1 4 5 6)");
  const setNumElements = (n) => setPoints(_.range(1, n+1))
  return (
    <div className="DiagramPage">
      <Sidebar
        numElements={points.length}
        setNumElements={setNumElements}
        generators={generators}
        setGenerators={setGenerators}
      />
      <Diagram
        points={points}
        numElements={points.length}
        generators={parseCycleNotation(generators)}
      />
    </div>
  );
}

function Sidebar({ numElements, setNumElements, generators, setGenerators }) {
  return (
    <section>
      <label>
        <div>Number of elements</div>
        <input
          type="number"
          value={numElements}
          onChange={(e) => setNumElements(+e.target.value)}
          min={1}
        />
      </label>
      <label>
        <div>Generators (in cycle notation, one generator per line)</div>
        <textarea
          value={generators}
          onChange={(e) => setGenerators(e.target.value)}
        />
      </label>
    </section>
  );
}

function Diagram({ numElements, generators, points }) {
  const n = numElements;
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
            {generator.map((cycle) => {
              return (
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
              );
            })}
          </g>
        );
      })}
      {points.map((p, i) => {
        const [x, y] = getCoordinates(i+1, n, radius);
        return (
          <g key={p} transform={`translate(${x}, ${y})`}>
            <circle stroke="grey" strokeWidth={1} fill="white" r={20}></circle>
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
  const x = radius * Math.cos(((i-1) * 2 * Math.PI) / n - Math.PI / 2);
  const y = radius * Math.sin(((i-1) * 2 * Math.PI) / n - Math.PI / 2);
  return [x, y];
}
