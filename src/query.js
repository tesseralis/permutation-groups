import {
  cyclicGroup,
  abelianGroup,
  symmetricGroup,
  alternatingGroup,
  dihedralGroup,
  dicyclicGroup,
  mathieuGroup,
} from "../groups";

const DEFAULT_GENERATORS = "(1 2 3)\n(4 5 6)\n(1 6)(3 4)";

function getGenerators(query) {
  if (query.group) {
    return parseFamily(query.group);
    // parse the family name and return the generators of the corresponding group
  }
  if (query.generators) {
    return query.generators;
  }
  return DEFAULT_GENERATORS;
}

function parseFamily(family) {
  const match = family.match(/^[A-Z][a-z]*([0-9])$/)
  if (!match) {
    return
  }
  const family = families.find(f => f.symbol === match[0])
}

const families = [
  { symbol: "C", generatorFn: cyclicGroup },
  { symbol: "D", generatorFn: dihedralGroup },
  { symbol: "Dic", generatorFn: dicyclicGroup },
  { symbol: "M", generatorFn: mathieuGroup },
  { symbol: "S", generatorFn: symmetricGroup },
  { symbol: "A", generatorFn: alternatingGroup },
];
