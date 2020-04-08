import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './universal.frag'

const defaultVague = 25

export function universalTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const t = new Transition(sprite, { vert, frag })

  const [ruleImage, vague] = options
  t.uniforms.vague = ((vague || defaultVague) as number) / 100

  // NOTE: need to preload ruleImage
  t.uniforms.uRule = Sprite.from(ruleImage as string).texture

  return t
}
