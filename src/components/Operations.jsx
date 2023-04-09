import { generatorToString, applyGenerator, randomize } from "../util"

export default function Operations({ generators, applyGenerator, setPoints }) {
  return <div>
        <h2>Operations</h2>
        {generators.map((generator) => {
          return (
            <div>
              {generatorToString(generator)}
              <button onClick={() => applyGenerator(generator)}>Apply</button>
            </div>
          );
        })}
        <button onClick={() => setPoints(points => randomize(points, generators))}>Scramble!</button>
      </div>
}