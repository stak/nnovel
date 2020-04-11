import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './zoom.frag'

const defaultZoomEnd = 80
const defaultFadeStart = 40

export function zoomTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const [zoomEnd, fadeStart] = options

  const t = new Transition(sprite, { vert, frag })

  t.uniforms.zoomEnd =
    (typeof zoomEnd === 'number' ? zoomEnd : defaultZoomEnd) / 100
  t.uniforms.fadeStart = Math.min(
    (typeof fadeStart === 'number' ? fadeStart : defaultFadeStart) / 100,
    1
  )

  return t
}
