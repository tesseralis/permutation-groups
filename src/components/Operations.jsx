import { cycleToString, applyGenerator, randomize } from "../util";
import { schemeCategory10 } from "d3-scale-chromatic";

export default function Operations({ generators, applyGenerator, setPoints }) {
  return (
    <div className="Operations">
      <div className="grid">
        {generators.map((generator, i) => {
          return (
            <>
              <button
                className="applyBtn"
                style={{ borderColor: schemeCategory10[i] }}
                onClick={() => applyGenerator(generator)}
              >
                {alphabet[i]}
              </button>
              <button
                className="applyBtn"
                style={{ borderColor: schemeCategory10[i] }}
                onClick={() => applyGenerator(generator)}
              >
                {alphabet[i]}
                <sup>-1</sup>
              </button>
              <div className="operation">
                {generator.map((cycle) => {
                  return <span>{cycleToString(cycle)}</span>;
                })}
              </div>
            </>
          );
        })}
      </div>
      <button
        className="scrambleBtn"
        onClick={() => setPoints((points) => randomize(points, generators))}
      >
        Scramble!
      </button>
    </div>
  );
}

const alphabet = "abcdefghijklmnopqrstuvwxyz";
