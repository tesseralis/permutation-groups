import {
  cyclicGroup,
  abelianGroup,
  symmetricGroup,
  alternatingGroup,
  dihedralGroup,
  dicyclicGroup,
  mathieuGroup,
} from "./groups";

import { generatorsToString } from "./util"

const DEFAULT_GENERATORS = "(1 2 3)\n(4 5 6)\n(1 6)(3 4)";

export function getGenerators(params = {}) {
  if (params.has('group')) {
    const group = parseGroupName(params.get('group'))
    // parse the family name and return the generators of the corresponding group
     if (group) {
       return generatorsToString(group)
     }
  }
  if (params.has('generators')) {
    return params.get('generators');
  }
  return DEFAULT_GENERATORS;
}

function parseGroupName(name) {
  const match = name.match(/^([A-Z][a-z]*)([0-9]+)$/);
  if (!match) return;
  const family = families.find((f) => f.symbol === match[1]);
  if (!family) return;
  return family.generatorFn(+match[2]);
}

const families = [
  { symbol: "C", generatorFn: cyclicGroup },
  { symbol: "D", generatorFn: dihedralGroup },
  { symbol: "Dic", generatorFn: dicyclicGroup },
  { symbol: "M", generatorFn: mathieuGroup },
  { symbol: "S", generatorFn: symmetricGroup },
  { symbol: "A", generatorFn: alternatingGroup },
];
