import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './blur.flag'

const defaultIntensity = 0.1
const defaultPass = 8

export function blurTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const t = new Transition(sprite, { vert, frag })

  console.log(options)
  const [intensity, pass] = options
  t.uniforms.intensity = intensity || defaultIntensity
  t.uniforms.pass = pass || defaultPass

  return t
}
