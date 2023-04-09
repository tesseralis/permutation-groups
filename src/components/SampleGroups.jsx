import {
  parseCycleNotation,
  generatorsToString,
  generatorToString,
  applyGenerator,
  pointsFromGenerators,
  cyclePairs,
  randomize,
} from "../util";
import _ from 'lodash'
import {
  cyclicGroup,
  symmetricGroup,
  alternatingGroup,
  dihedralGroup,
  mathieuGroup,
} from "../groups";

export default function SampleGroups({ setGenerators }) {
  return <div>
        <h3>Cyclic Groups</h3>
        <p>Just a cycle.</p>
        {_.range(2, 13).map((n) => {
          return (
            <button
              onClick={() => setGenerators(generatorsToString(cyclicGroup(n)))}
            >
              C<sub>{n}</sub>
            </button>
          );
        })}
        <h3>Dihedral Groups</h3>
        <p>
          Symmetries of an <em>n</em>-gon.
        </p>
        {_.range(3, 13).map((n) => {
          return (
            <button
              onClick={() =>
                setGenerators(generatorsToString(dihedralGroup(n)))
              }
            >
              D<sub>{n}</sub>
            </button>
          );
        })}
        <h3>Symmetric Groups</h3>
        <p>All the permutations.</p>
        {_.range(3, 13).map((n) => {
          return (
            <button
              onClick={() =>
                setGenerators(generatorsToString(symmetricGroup(n)))
              }
            >
              S<sub>{n}</sub>
            </button>
          );
        })}
        <h3>Alternating Groups</h3>
        <p>Half the permutations (the even ones).</p>
        {_.range(4, 13).map((n) => {
          return (
            <button
              onClick={() =>
                setGenerators(generatorsToString(alternatingGroup(n)))
              }
            >
              A<sub>{n}</sub>
            </button>
          );
        })}
        <h3>Mathieu Groups</h3>
        <p>Smallest of the sporadic groups.</p>
        {[11,12,22,23,24].map((n) => {
          return (
            <button
              onClick={() =>
                setGenerators(generatorsToString(mathieuGroup(n)))
              }
            >
              M<sub>{n}</sub>
            </button>
          );
        })}
      </div>
}