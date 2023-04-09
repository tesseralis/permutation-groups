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

import { parseGroupName } from "../groups"

import { schemeCategory10 } from "d3-scale-chromatic";
import _ from "lodash";
import Diagram from "../components/Diagram";
import SampleGroups from "../components/SampleGroups";
import Operations from "../components/Operations";
import { setSearchParams, getGenerators } from '../searchParams'

export default function DiagramPage() {
  const params = new URL(document.location).searchParams;
  const paramGens = getGenerators(params);
  const [generators, setGenerators] = React.useState(paramGens);
  const [points, setPoints] = React.useState(
    pointsFromGenerators(parseCycleNotation(generators))
  );
  const [hoveredCycle, setHoveredCycle] = React.useState(null);
  const setNumElements = (n) => setPoints(_.range(1, n + 1));
  const doApplyGenerator = (generator) => {
    setPoints((p) => applyGenerator(generator, p));
  };

  const doSetGenerators = (generators) => {
    setGenerators(generators);
    setPoints(pointsFromGenerators(parseCycleNotation(generators)));
    setSearchParams({ generators })
  };
  
  const setGroup = (name) => {
      const generators = generatorsToString(parseGroupName(name))
      setGenerators(generators);
      setPoints(pointsFromGenerators(parseCycleNotation(generators)));
    setSearchParams({ group: name })
  }
  
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
      <p>
        This app visualizes the operations of a{" "}
        <a href="https://en.wikipedia.org/wiki/Permutation_group">
          permutation group
        </a>{" "}
        given a set of generators. Click the circular buttons or the lines in the diagram to apply that operation (or
        its inverse) on the elements.
      </p>
      <p>
        Click the "Scramble" button to scramble all the elements and try to put
        them back in order!
      </p>
      <label>
        <div>Generators (in cycle notation, one generator per line)</div>
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
      <h2>Sample Groups</h2>
      <SampleGroups setGroup={setGroup} />
    </section>
  );
}
