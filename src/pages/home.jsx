import * as React from "react";
import {
  parseCycleNotation,
  generatorsToString,
  generatorToString,
  applyGenerator,
  pointsFromGenerators,
  cyclePairs,
  randomize,
} from "../util";
import useSearchParams from "../useSearchParams";

import { parseGroupName } from "../groups";

import { schemeCategory10 } from "d3-scale-chromatic";
import _ from "lodash";
import Diagram from "../components/Diagram";
import SampleGroups from "../components/SampleGroups";
import Operations from "../components/Operations";
import { getGenerators } from "../searchParams";

export default function DiagramPage() {
  const [params, setSearchParams] = useSearchParams();
  const generators = getGenerators(params);
  const [points, setPoints] = React.useState(
    pointsFromGenerators(parseCycleNotation(generators))
  );
  const [prevGenerators, setPrevGenerators] = React.useState(generators);
  const [hoveredCycle, setHoveredCycle] = React.useState(null);
  const setNumElements = (n) => setPoints(_.range(1, n + 1));
  const doApplyGenerator = (generator) => {
    setPoints((p) => applyGenerator(generator, p));
  };

  // Reset points if generators changes
  if (generators !== prevGenerators) {
    setPrevGenerators(generators);
    setPoints(pointsFromGenerators(parseCycleNotation(generators)));
  }

  const doSetGenerators = (generators) => {
    setSearchParams({ generators });
  };

  const setGroup = (name) => {
    setSearchParams({ group: name });
  };

  return (
    <div className="DiagramPage">
      <Sidebar
        numElements={points.length}
        setNumElements={setNumElements}
        generators={generators}
        setGenerators={doSetGenerators}
        applyGenerator={doApplyGenerator}
        setPoints={setPoints}
        setHoveredCycle={setHoveredCycle}
        setGroup={setGroup}
      />
      <Diagram
        key={generators}
        points={points}
        numElements={points.length}
        generators={parseCycleNotation(generators)}
        applyGenerator={doApplyGenerator}
        hoveredCycle={hoveredCycle}
        setHoveredCycle={setHoveredCycle}
      />
    </div>
  );
}

function Sidebar({
  numElements,
  setNumElements,
  generators: generatorsString,
  setPoints,
  setGenerators,
  applyGenerator,
  setHoveredCycle,
  setGroup,
}) {
  const generators = parseCycleNotation(generatorsString);
  return (
    <section className="Sidebar">
      <h1>Permutation Group Visualizer</h1>
      <p className="tag">
        by <a href="https://tesseralis.site">@tesseralis</a>
      </p>
      <p>
        This app visualizes the operations of a{" "}
        <a href="https://en.wikipedia.org/wiki/Permutation_group">
          permutation group
        </a>{" "}
        given a set of generators. Click the circular buttons or the lines in
        the diagram to apply that operation (or its inverse) on the elements.
      </p>
      <p>
        Click the "Scramble" button to scramble all the elements and try to put
        them back in order!
      </p>
      <label>
        <h2>Generators</h2> 
        <div>In cycle notation, one generator per line.</div>
        <textarea
          placeholder="(1 2 3)&#10;(1 2)"
          value={generatorsString}
          onChange={(e) => setGenerators(e.target.value)}
        />
      </label>
      <h2>Operations</h2>
      <Operations
        generators={generators}
        applyGenerator={applyGenerator}
        setPoints={setPoints}
        setHovered={setHoveredCycle}
      />
      <h2>Group Families</h2>
      <SampleGroups setGroup={setGroup} />
      <h2>More Groups</h2>
      <ul>
        <li>
          <a href="https://nathancarter.github.io/group-explorer/index.html">
            Group Explorer
          </a>{" "}
          - More visualizations of groups such as Cayley diagrams and cycle
          diagrams.
        </li>
        <li>
          <a href="https://people.maths.bris.ac.uk/~matyd/GroupNames/">
            GroupNames
          </a>{" "}
          - A treasure trove of information on small groups. Copy the code in
          "Permutation Representations" and plug it into this app!
        </li>
        <li>
          <a href="https://beta.lmfdb.org/Groups/Abstract/">LMFDB</a> - An even
          bigger treasure trove of groups with search functionality.
        </li>
        <li>
          <a href="https://brauer.maths.qmul.ac.uk/Atlas/">The ATLAS</a> - A
          compendium of Finite Simple Groups.
        </li>
      </ul>
    </section>
  );
}
