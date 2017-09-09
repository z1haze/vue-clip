export function clipCSS (opts) {
  const {shape, coords, radius, position} = opts

  if (coords.length < 3 && shape.name === 'Custom') return 'none'

  switch (shape.name) {
    case 'Circle':
      return clipType(shape) + '(' + radius + '% at ' + position[0] + '% ' + position[1] + '%)'
    default:
      return clipType(shape) + '(' + clipPoints(coords).join(', ') + ')'
  }
}

export function clipPoints (coords) {
  return coords.map(i => {
    return i.map(o => {
      return o + '%'
    }).join(' ')
  })
}

export function clipType (shape) {
  switch (shape.name) {
    case 'Circle':
      return 'circle'
    default:
      return 'polygon'
  }
}
