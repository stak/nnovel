import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './randsquare.frag'

const defaultSplitX = 10
const defaultSplitY = 10
const defaultSmoothness = 50

export function randsquareTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const [splitX, splitY, smoothness] = options

  const t = new Transition(sprite, { vert, frag })

  t.uniforms.splitX = splitX || defaultSplitX
  t.uniforms.splitY = splitY || defaultSplitY
  t.uniforms.smoothness = ((smoothness as number) || defaultSmoothness) / 100

  return t
}
