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
  abelianGroup,
  symmetricGroup,
  alternatingGroup,
  dihedralGroup,
  dicyclicGroup,
  mathieuGroup,
} from "../groups";
import { Fragment } from "react";

export default function SampleGroups({ setGroup }) {
  return (
    <div className="SampleGroups">
      {families.map(
        ({ title, description, range, generators, symbol = title[0], path }) => {
          return (
            <div key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="list">
                {range.map((n) => {
                  const name = path?.(n) ?? symbol + n
                  return (
                    <a
                      className="groupLink"
                      href={`?group=${name}`}
                      key={n}
                      onClick={(e) => {
                        e.preventDefault();
                        setGroup(name);
                      }}
                    >
                      {getSymbol(symbol, n)}
                    </a>
                  );
                })}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

function getSymbol(symbol, n) {
  if (typeof symbol === "function") {
    return symbol(n);
  }
  return (
    <>
      {symbol}
      <sub>{n}</sub>
    </>
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
    title: "Abelian Groups",
    description: "They always commute.",
    range: [
      [2, 2],
      [2, 2, 2],
      [2, 4],
      [3, 3],
      [2, 6],
    ],
    generators: abelianGroup,
    path: ns => {
      return ns.map(n => 'C'+n).join('x')
    },
    symbol: (ns) => {
      // TODO support power notation
      return (
        <>
          {ns
            .map((n, i) => (
              <span key={i}>
                C<sub>{n}</sub>
              </span>
            ))
            .flatMap((cn, i) => (i === 0 ? [cn] : [" × ", cn]))}
        </>
      );
    },
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
    title: "Dicyclic Groups",
    symbol: "Dic",
    description: "Quaternions n' friends.",
    range: _.range(2, 7),
    generators: dicyclicGroup,
  },
  {
    title: "Mathieu Groups",
    description: "Smallest of the sporadic groups.",
    range: [11, 12, 22, 23, 24],
    generators: mathieuGroup,
  },
];
