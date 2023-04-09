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
                style={{ borderColor: schemeCategory10[i]}}
                onClick={() => applyGenerator(generator)}>Apply</button>
              <div className="operation">{generator.map(cycle => {
                  return <span>{cycleToString(cycle)}</span>
                })}</div>
            </>
          );
        })}
      </div>
      <button
        onClick={() => setPoints((points) => randomize(points, generators))}
      >
        Scramble!
      </button>
    </div>
  );
}
