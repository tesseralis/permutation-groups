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
import {
  cyclicGroup,
  symmetricGroup,
  alternatingGroup,
  dihedralGroup,
  mathieuGroup,
} from "../groups";

export default function SampleGroups({ setGenerators }) {
  return (
    <div className="SampleGroups">
      {families.map(({title, description, range, generators }) => {
        return <div>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="list">
          {range.map(n => {
            return <button onClick={() => setGenerators(generatorsToString(generators(n)))}>{title[0]}<sub>{n}</sub></button>
          })}
          </div>
          </div>
      })}
    </div>
  );
}

const families = [
  {
    title: "Cyclic Groups",
    description: "Just a cycle.",
    range: _.range(2, 13),
    generators: cyclicGroup,
  },
  {
    title: "Dihedral Groups",
    description: (
      <span>
        Symmetries of an <em>n</em>-gon.
      </span>
    ),
    range: _.range(2, 13),
    generators: dihedralGroup,
  },
  {
    title: "Symmetric Groups",
    description: "All the permutations.",
    range: _.range(3, 13),
    generators: symmetricGroup,
  },
    {
    title: "Alternating Groups",
    description: "Half the permutations. (the even ones)",
    range: _.range(4, 13),
    generators: alternatingGroup,
  },
      {
    title: "Mathieu Groups",
    description: "Smallest of the sporadic groups.",
    range: [11,12,22,23,24],
    generators: mathieuGroup,
  },
];
