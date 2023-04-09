const DEFAULT_GENERATORS = "(1 2 3)\n(4 5 6)\n(1 6)(3 4)"

function getGenerators(query) {
  if (query.group) {
    return parseFamily(query.group)
    // parse the family name and return the generators of the corresponding group
  }
  if (query.generators) {
    return query.generators
  }
  return DEFAULT_GENERATORS
}

function parseFamily(family) {
  
}
