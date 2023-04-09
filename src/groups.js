import _ from "lodash";

// Generators for a cyclic group of order n
export function cyclicGroup(n) {
  return [[_.range(1, n + 1)]];
}

export function symmetricGroup(n) {
  return [_.range(1, n + 1), [1, 2]];
}

export function alternatingGroup(n) {
  return [_.range(1, n + (n % 2 === 1 ? 1 : 0)), _.range(n - 2, n + 1)];
}

// Dihedral group of order 2n
export function dihedralGroup(n) {
  return [
    [_.range(1, n + 1), _.range(n + 1, 2 * n + 1)],
    _.range(1, n + 1).map((i) => [2 * i - 1, 2 * i]),
  ];
}
