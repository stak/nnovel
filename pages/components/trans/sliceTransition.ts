import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './slice.flag'

const defaultCount = 15
const defaultSmoothness = 0.5

export function sliceTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const t = new Transition(sprite, { vert, frag })

  const [count, smoothness] = options
  t.uniforms.count = count || defaultCount
  t.uniforms.smoothness = smoothness || defaultSmoothness

  return t
}
