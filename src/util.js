export function parseCycleNotation(cyclesString) {
  return cyclesString.split('\n').filter(x => !!x).map(parseGenerator)
}

function parseGenerator(generator) {
  return [...generator.matchAll(/\(([^)]+)\)/g)].map(x => x[1].split(' ').map(i => +i))
}

export function applyGenerator(generator, points) {
  return generator.map(cycle => applyCycle(cycle, points))
}

function applyCycle(cycle, points) {
  
}