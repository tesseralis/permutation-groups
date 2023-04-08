import _ from 'lodash'

export function parseCycleNotation(cyclesString) {
  return cyclesString.split('\n').filter(x => !!x).map(parseGenerator)
}

function parseGenerator(generator) {
  return [...generator.matchAll(/\(([^)]+)\)/g)].map(x => x[1].split(/ |,/g).map(i => +i))
}

export function applyGenerator(generator, points) {
  let result = [...points]
  for (const cycle of generator) {
    result = applyCycle(cycle, result)
  }
  return result
}

function applyCycle(cycle, points) {
  return points.map(p => applyCycleToPoint(cycle, p))
}

function applyCycleToPoint(cycle, point) {
  const index = cycle.indexOf(point)
  if (index === -1) return point
  return cycle[(index + 1) % cycle.length]
}

export function generatorToString(generator) {
  return generator.map(cycleToString).join('')
}

function cycleToString(cycle) {
  return '(' + cycle.join(' ') + ')'
}

export function pointsFromGenerators(generators) {
  const maxPoint = _.max(generators.flat().flat())
  return _.range(1, maxPoint + 1)
}