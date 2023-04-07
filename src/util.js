export function parseCycleNotation(cyclesString) {
  return cyclesString.split('\n').filter(x => !!x).map(parseGenerator)
}

function parseGenerator(generator) {
  return [...generator.matchAll(/\(([^)]+)\)/g)].map(x => x[1].split(' ').map(i => +i))
}