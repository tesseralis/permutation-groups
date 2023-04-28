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
        ({
          title,
          description,
          range,
          generators,
          symbol = title[0],
          path,
          ref,
        }) => {
          return (
            <div key={title}>
              <h3>{title}</h3>
              <p>{description} <a href={ref} target="_blank" rel="noopener noreferrer">ref</a></p>
              <div className="list">
                {range.map((n) => {
                  const name = path?.(n) ?? symbol + n;
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
    ref: "https://people.maths.bris.ac.uk/~matyd/GroupNames/cyclic.html",
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
    path: (ns) => {
      return ns.map((n) => "C" + n).join("x");
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
    ref: "https://people.maths.bris.ac.uk/~matyd/GroupNames/A.html",
  },
  {
    title: "Dihedral groups",
    description: (
      <span>
        Symmetries of an <em>n</em>-gon.
      </span>
    ),
    range: _.range(2, 13),
    generators: dihedralGroup,
    ref: "https://people.maths.bris.ac.uk/~matyd/GroupNames/dihedral.html",
  },
  {
    title: "Symmetric groups",
    description: "All the permutations.",
    range: _.range(3, 13),
    generators: symmetricGroup,
    ref: "https://people.maths.bris.ac.uk/~matyd/GroupNames/symmetric.html",
  },
  {
    title: "Alternating groups",
    description: "Half the permutations (the even ones).",
    range: _.range(4, 13),
    generators: alternatingGroup,
    ref: "https://people.maths.bris.ac.uk/~matyd/GroupNames/alternating.html",
  },
  {
    title: "Dicyclic groups",
    symbol: "Dic",
    description: "Quaternions n' friends.",
    range: _.range(2, 7),
    generators: dicyclicGroup,
    ref: "https://people.maths.bris.ac.uk/~matyd/GroupNames/dicyclic.html",
  },
  {
    title: "Semidihedral groups",
    symbol: "SD",
    description: "The dihedral groups' cousin.",
    range: _.range(3, 6).map((n) => 2 ** n),
    ref: "https://people.maths.bris.ac.uk/~matyd/GroupNames/semidihedral.html",
  },
  {
    title: "Modular maximal-cyclic groups",
    description: "The dihedral groups' other cousin.",
    range: _.range(4, 7),
    symbol: (n) => (
      <>
        M<sub>{n}</sub>(2)
      </>
    ),
    path: (n) => `M${n}(2)`,
    ref: "https://people.maths.bris.ac.uk/~matyd/GroupNames/modular.html",
  },
  {
    title: "Mathieu groups",
    description: "Smallest of the sporadic groups.",
    range: [11, 12, 22, 23, 24],
    generators: mathieuGroup,
    ref: "https://en.wikipedia.org/wiki/Mathieu_group",
  },
];
