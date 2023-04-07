export function parseCycleNotation(cyclesString) {
  return cyclesString.split('\n').filter(x => !!x).map(cycle => cycle.replace(/\(|\)/g, '').split(' ').map(i => +i))
}