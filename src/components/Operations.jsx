import { generatorToString, applyGenerator, randomize } from "../util";

export default function Operations({ generators, applyGenerator, setPoints }) {
  return (
    <div className="Operations">
      <div className="grid">
        {generators.map((generator) => {
          return (
            <>
              <button onClick={() => applyGenerator(generator)}>Apply</button>
              <div>{generatorToString(generator)}</div>
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
