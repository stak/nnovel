import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './pixelize.frag'

const defaultSplitX = 10
const defaultSplitY = 10
const defaultSteps = 30

export function pixelizeTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const [splitX, splitY, steps] = options

  const t = new Transition(sprite, { vert, frag })

  t.uniforms.splitX = splitX || defaultSplitX
  t.uniforms.splitY = splitY || defaultSplitY
  t.uniforms.steps = (steps as number) || defaultSteps

  return t
}
