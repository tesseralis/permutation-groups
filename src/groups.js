import _ from "lodash";

// Generators for a cyclic group of order n
export function cyclicGroup(n) {
  return [[_.range(1, n + 1)]];
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
        [_.range(1, 12)],
        [
          [3, 7, 11, 8],
          [4, 10, 5, 6],
        ],
      ];
    case 12:
      return [
        [_.range(1, 12)],
        [
          [3, 7, 11, 8],
          [4, 10, 5, 6],
        ],
        [
          [1, 12],
          [2, 11],
          [3, 6],
          [4, 8],
          [5, 9],
          [7, 10],
        ],
      ];
    case 22:
      return [
        [
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        ],
        [
          [1, 4, 5, 9, 3],
          [2, 8, 10, 7, 6],
          [12, 15, 16, 20, 14],
          [13, 19, 21, 18, 17],
        ],
        [
          [1, 21],
          [2, 10, 8, 6],
          [3, 13, 4, 17],
          [5, 19, 9, 18],
          [11, 22],
          [12, 14, 16, 20],
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
