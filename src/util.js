import _ from "lodash";

export function parseCycleNotation(cyclesString) {
  return cyclesString
    .split("\n")
    .filter((x) => !!x)
    .map(parseGenerator);
}

function parseGenerator(generator) {
  return [...generator.matchAll(/\(([^)]+)\)/g)].map((x) =>
    x[1].trim().split(/[ ,]+/g).map((i) => +i)
  );
}

export function applyGenerator(generator, points) {
  let result = [...points];
  for (const cycle of generator) {
    result = applyCycle(cycle, result);
  }
  return result;
}

export function cyclePairs(cycle) {
  return cycle.map((p, i) => [p, cycle[(i + 1) % cycle.length]]);
}

function applyCycle(cycle, points) {
  return points.map((p) => applyCycleToPoint(cycle, p));
}

function applyCycleToPoint(cycle, point) {
  const index = cycle.indexOf(point);
  if (index === -1) return point;
  return cycle[(index + 1) % cycle.length];
}

export function generatorToString(generator) {
  return generator.map(cycleToString).join("");
}

export function cycleToString(cycle) {
  return "(" + cycle.join(" ") + ")";
}

export function pointsFromGenerators(generators) {
  const maxPoint = _.max(generators.flat().flat());
  return _.range(1, maxPoint + 1);
}

export function generatorsToString(generators) {
  return generators.map(generatorToString).join("\n");
}

export function inversePermutation(permutation) {
  return permutation.map(cycle => [...cycle].reverse())
}

// Return whether the permutation is its own inverse
// NOTE: doesn't work if there are duplicates
export function isInvolution(permutation) {
  return permutation.every(cycle => cycle.length === 2)
}

export function randomize(points, operations) {
  let tmp = points;
  for (let i = 0; i < randRange(50, 100); i++) {
    const gen = operations[randInt(operations.length)];
    tmp = applyGenerator(gen, tmp);
    console.log(tmp)
  }
  return tmp;
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

function randRange(min, max) {
  return randInt(max - min) + min;
}
