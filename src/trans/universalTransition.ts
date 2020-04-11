import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './universal.frag'

const defaultVague = 25

export function universalTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const [ruleImage, vague, reverse] = options

  const filledFrag = frag.replace(/\$0/g, () =>
    reverse ? 'rule.r' : '(1.0 - rule.r)'
  )
  const t = new Transition(sprite, { vert, frag: filledFrag })

  t.uniforms.vague = ((vague || defaultVague) as number) / 100

  // NOTE: need to preload ruleImage
  t.uniforms.uRule = Sprite.from(ruleImage as string).texture

  return t
}
