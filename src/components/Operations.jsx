import {
  cycleToString,
  applyGenerator,
  inversePermutation,
  isInvolution,
  randomize,
} from "../util";
import _ from "lodash";
import tinycolor from "tinycolor2";
import { schemeCategory10 } from "d3-scale-chromatic";

export default function Operations({
  generators,
  applyGenerator,
  setPoints,
  setHovered,
}) {
  return (
    <div className="Operations">
      <div className="grid">
        {generators.map((generator, i) => {
          return (
            <div
              key={i}
              className="gridRow"
              style={{
                "--operation-color": schemeCategory10[i],
                "--operation-bg": lighten(schemeCategory10[i]),
              }}
            >
              <button
                className="applyBtn"
                onClick={() => applyGenerator(generator)}
                onMouseOver={() => {
                  setHovered([i]);
                }}
                onMouseOut={() => {
                  setHovered(null);
                }}
              >
                <em>{alphabet[i]}</em>
              </button>
              {isInvolution(generator) ? (
                <div />
              ) : (
                <button
                  className="applyBtn"
                  onClick={() => applyGenerator(inversePermutation(generator))}
                  onMouseOver={() => {
                    setHovered([i, null, true]);
                  }}
                  onMouseOut={() => {
                    setHovered(null);
                  }}
                >
                  <em>{alphabet[i]}</em>
                  <sup>-1</sup>
                </button>
              )}
              <div className="permutation">
                {generator.map((cycle, j) => {
                  return (
                    <span
                      key={j}
                      className="cycle"
                      onMouseOver={() => {
                        setHovered([i, j]);
                      }}
                      onMouseOut={() => {
                        setHovered(null);
                      }}
                    >
                      {cycleToString(cycle)}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="toolbar">
        <button
          className="scrambleBtn"
          onClick={() => setPoints((points) => _.range(1, points.length + 1))}
        >
          Reset
        </button>
        <button
          className="scrambleBtn"
          onClick={() => setPoints((points) => randomize(points, generators))}
        >
          Scramble!
        </button>
      </div>
    </div>
  );
}

const alphabet = "abcdefghijklmnopqrstuvwxyz";
function lighten(color) {
  return tinycolor(color).setAlpha(0.2).toString();
}
