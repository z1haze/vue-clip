export function clipCSS (shape) {
  if (shape.coords.length < 3) return 'none'

  return clipType(shape) + '(' + clipPoints(shape.coords).join(', ') + ')'
}

export function clipPoints (coords) {
  return coords.map(i => {
    return i.map(o => {
      return o + '%'
    }).join(' ')
  })
}

export function clipType (shape) {
  return 'polygon'
}
