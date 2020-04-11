import { Sprite, Matrix } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './radial.frag'

const defaultSmoothness = 50
const defaultStartPos = 'up'

const directionPart: { [key: string]: number } = {
  right: 180,
  left: 0,
  up: 270,
  down: 90,
}

export function radialTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const [startPos, smoothness, reverse] = options

  let deg
  if (typeof startPos === 'string') {
    deg = directionPart[startPos as string] || 0
  } else if (typeof startPos === 'number') {
    deg = startPos
  } else {
    deg = directionPart[defaultStartPos]
  }
  const rad = (deg * Math.PI) / 180

  const t = new Transition(sprite, { vert, frag })

  t.uniforms.smoothness =
    (typeof smoothness === 'number' ? smoothness : defaultSmoothness) / 100
  t.uniforms.rotate = new Matrix().identity().rotate(rad)
  t.uniforms.reverse = !!reverse

  return t
}
