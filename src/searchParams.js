import {
  cyclicGroup,
  abelianGroup,
  symmetricGroup,
  alternatingGroup,
  dihedralGroup,
  dicyclicGroup,
  mathieuGroup,
} from "./groups";

const DEFAULT_GENERATORS = "(1 2 3)\n(4 5 6)\n(1 6)(3 4)";

export function getGenerators(params = {}) {
  if (params.has('group')) {
    console.log('parsing', params.get('group'))
    // parse the family name and return the generators of the corresponding group
    return parseGroupName(params.get('group')) ?? DEFAULT_GENERATORS;
  }
  if (params.has('generators')) {
    return params.generators;
  }
  return DEFAULT_GENERATORS;
}

function parseGroupName(name) {
  console.log('parsing group name', name)
  const match = name.match(/^([A-Z][a-z]*)([0-9])$/);
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
