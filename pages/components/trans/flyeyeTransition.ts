import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './flyeye.flag'

const defaultSize = 0.04
const defaultZoom = 10.0
const defaultColorSeparation = 0.3

export function flyeyeTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const t = new Transition(sprite, { vert, frag })

  const [size, zoom, colorSeparation] = options
  t.uniforms.size = size || defaultSize
  t.uniforms.zoom = zoom || defaultZoom
  t.uniforms.colorSeparation = colorSeparation || defaultColorSeparation

  return t
}
