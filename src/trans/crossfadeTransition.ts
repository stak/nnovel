import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './crossfade.frag'

export function crossfadeTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const t = new Transition(sprite, { vert, frag })

  options // no option
  return t
}
