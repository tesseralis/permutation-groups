import * as React from "react";
import {
  parseCycleNotation,
  generatorsToString,
  generatorToString,
  applyGenerator,
  pointsFromGenerators,
  cyclePairs,
} from "../util";

import { cyclicGroup, symmetricGroup, alternatingGroup, dihedralGroup } from "../groups"
import { schemeCategory10 } from "d3-scale-chromatic";
import _ from "lodash";

export default function DiagramPage() {
  const params = new URL(document.location).searchParams;
  const paramGens = params.get("generators") || "(1 2 3)\n(1 4 5 6)";
  const [generators, setGenerators] = React.useState(paramGens);
  const [points, setPoints] = React.useState(
    pointsFromGenerators(parseCycleNotation(generators))
  );
  const setNumElements = (n) => setPoints(_.range(1, n + 1));
  const doApplyGenerator = (generator) => {
    setPoints((p) => applyGenerator(generator, p));
  };

  const doSetGenerators = (generators) => {
    setGenerators(generators);
    setPoints(pointsFromGenerators(parseCycleNotation(generators)));
    params.set("generators", generators);
    const newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      params.toString();
    window.history.pushState({ path: newurl }, "", newurl);
  };
  return (
    <div className="DiagramPage">
      <Sidebar
        numElements={points.length}
        setNumElements={setNumElements}
        generators={generators}
        setGenerators={doSetGenerators}
        applyGenerator={doApplyGenerator}
      />
      <Diagram
        key={generators}
        points={points}
        numElements={points.length}
        generators={parseCycleNotation(generators)}
      />
    </div>
  );
}

function Sidebar({
  numElements,
  setNumElements,
  generators,
  setGenerators,
  applyGenerator,
}) {
  return (
    <section>
      <p>
        This app visualizes the operations of a{" "}
        <a href="https://en.wikipedia.org/wiki/Permutation_group">
          permutation group
        </a>{" "}
        given a set of generators. Click the "Apply" button to apply that
        operation on the elements.
      </p>
      <label>
        <div>Generators (in cycle notation, one generator per line)</div>
        <textarea
          placeholder="(1 2 3)&#10;(1 2)"
          value={generators}
          onChange={(e) => setGenerators(e.target.value)}
        />
      </label>
      <div>
        <h2>Operations</h2>
        {parseCycleNotation(generators).map((generator) => {
          return (
            <div>
              {generatorToString(generator)}
              <button onClick={() => applyGenerator(generator)}>Apply</button>
            </div>
          );
        })}
      </div>
      <div>
        <h2>Sample Groups</h2>
        <h3>Cyclic Groups</h3>
        {_.range(2, 11).map(n => {
          return <button onClick={() => setGenerators(generatorsToString(cyclicGroup(n)))}>C<sub>{n}</sub></button>
        })}
      </div>
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
                <>
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
                  {cycle.length > 2 && cyclePairs(cycle).map(([a, b]) => {
                    const u = getCoordinates(a, n, radius - 2 * j)
                    const v = getCoordinates(b, n, radius - 2 * j)
                    const position = midpoint(u, v)
                    const angle = Math.atan2(u[1]-v[1], u[0]-v[0]) / (2 * Math.PI) * 360
                    const arrowRad = 5
                    return <g transform={`translate(${position[0]}, ${position[1]})rotate(${angle})`}>
                      <polygon points={`-${arrowRad},0 ${arrowRad},${arrowRad} ${arrowRad},-${arrowRad}`} fill="currentColor"/>
                      </g>;
                  })}
                </>
              );
            })}
          </g>
        );
      })}
      {_.range(1, points.length+1).map(p => {
        const [x, y] = getCoordinates(p, n, radius);
        return <circle cx={x} cy={y} fill="lightgrey" r={20}> 
        </circle>
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
