import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './blur.frag'

const defaultIntensity = 10
const defaultPass = 8

export function blurTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const [intensity, pass] = options

  const stringPass = String(pass || defaultPass)
  const filledFrag = frag.replace(/\$0/g, () => stringPass)
  const t = new Transition(sprite, { vert, frag: filledFrag })

  t.uniforms.intensity = ((intensity as number) || defaultIntensity) / 100

  return t
}
