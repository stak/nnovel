import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './crosszoom.frag'

const defaultStrength = 0.4

export function crosszoomTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const t = new Transition(sprite, { vert, frag })

  const [strength] = options
  t.uniforms.strength = strength || defaultStrength

  return t
}
