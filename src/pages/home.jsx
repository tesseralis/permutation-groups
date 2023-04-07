import * as React from "react";
import { parseCycleNotation } from "../util"

export default function DiagramPage() {
  const [numElements, setNumElements] = React.useState(6);
  const [generators, setGenerators] = React.useState("(1 2 3)\n(4 5 6)")
  return (
    <div className="DiagramPage">
      <Sidebar numElements={numElements} setNumElements={setNumElements} generators={generators} setGenerators={setGenerators} />
      <Diagram numElements={numElements} />
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
        <textarea value={generators} onChange={e => setGenerators(e.target.value)}/>
      </label>
    </section>
  );
}

function Diagram({ numElements }) {
  const n = numElements;
  const radius = 250;
  return (
    <svg
      className="Diagram"
      width={600}
      height={600}
      viewBox="-300 -300 600 600"
    >
      {[...Array(n).keys()].map((i) => {
        const x = radius * Math.cos((i * 2 * Math.PI) / n - Math.PI/2);
        const y = radius * Math.sin((i * 2 * Math.PI) / n - Math.PI/2);

        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
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
