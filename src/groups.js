import _ from "lodash";

export function parseGroupName(name) {
  const abelian = parseAbelian(name);
  if (abelian) return abelian;
  const match = name.match(/^([A-Z][a-z]*)([0-9]+)$/);
  if (!match) return;
  const family = families.find((f) => f.symbol === match[1]);
  if (!family) return;
  return family.generatorFn(+match[2]);
}

function parseAbelian(name) {
  const match = name.match(/^(?:C[0-9]+_)+C[0-9]+$/);
  if (!match) return;
  const ns = name.split("_").map((n) => +n.slice(1));
  return abelianGroup(ns);
}

const families = [
  { symbol: "C", generatorFn: cyclicGroup },
  { symbol: "D", generatorFn: dihedralGroup },
  { symbol: "Dic", generatorFn: dicyclicGroup },
  { symbol: "M", generatorFn: mathieuGroup },
  { symbol: "S", generatorFn: symmetricGroup },
  { symbol: "A", generatorFn: alternatingGroup },
];

// Generators for a cyclic group of order n
export function cyclicGroup(n) {
  return [[_.range(1, n + 1)]];
}

// Abelian group of the form C_{n1} x C_{n2} ... x C_{n_k}
export function abelianGroup(ns) {
  let i = 1;
  const gens = [];
  for (const n of ns) {
    gens.push([_.range(i, i + n)]);
    i += n;
  }
  return gens;
}

export function symmetricGroup(n) {
  return [[_.range(1, n + 1)], [[1, 2]]];
}

export function alternatingGroup(n) {
  return [[_.range(1, n + (n % 2 === 1 ? 1 : 0))], [_.range(n - 2, n + 1)]];
}

// Dihedral group of order 2n
export function dihedralGroup(n) {
  return [
    [_.range(1, n + 1), _.range(2 * n, n, -1)],
    _.range(1, n + 1).map((i) => [i, 2 * n + 1 - i]),
  ];
}

export function dicyclicGroup(n) {
  return [
    [
      [1, 2 * n + 1, n + 1, 3 * n + 1],
      ..._.range(2, n + 1).map((i) => [i, 4 * n - i + 2, n + i, 3 * n - i + 2]),
    ],
    [_.range(1, 2 * n + 1), _.range(2 * n + 1, 4 * n + 1)],
  ];
}

export function mathieuGroup(n) {
  switch (n) {
    case 11:
      return [
        [
          [1, 5, 4, 2],
          [6, 11, 10, 7],
        ],
        [
          [9, 10],
          [7, 8],
          [2, 3],
          [11, 1],
        ],
      ];
    case 12:
      return [
        [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          [10, 11, 12],
        ],
        [
          [3, 4],
          [6, 7],
          [9, 10],
          [12, 11],
        ],
      ];
    case 22:
      return [
        [
          [1, 6, 5, 2],
          [7, 11, 10, 8],
          [12, 13, 16, 17],
          [18, 19, 21, 22],
          [3, 4],
          [14, 15],
        ],
        [
          [22, 1],
          [2, 3],
          [6, 7],
          [8, 9],
          [11, 12],
          [13, 14],
          [17, 18],
          [19, 20],
        ],
      ];
    case 23:
      return [
        [_.range(1, 24)],
        [
          [3, 17, 10, 7, 9],
          [4, 13, 14, 19, 5],
          [8, 18, 11, 12, 23],
          [15, 20, 22, 21, 16],
        ],
      ];
    case 24:
      return [
        [_.range(1, 24)],
        [
          [3, 17, 10, 7, 9],
          [4, 13, 14, 19, 5],
          [8, 18, 11, 12, 23],
          [15, 20, 22, 21, 16],
        ],
        [
          [1, 24],
          [2, 23],
          [3, 12],
          [4, 16],
          [5, 18],
          [6, 10],
          [7, 20],
          [8, 14],
          [9, 21],
          [11, 17],
          [13, 22],
          [15, 19],
        ],
      ];
  }
}
