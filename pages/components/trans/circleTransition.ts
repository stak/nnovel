import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './circle.frag'

const defaultSmoothness = 50
const defaultCenterX = 50
const defaultCenterY = 50

export function circleTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const [smoothness, reverse, centerX, centerY] = options
  const filledFrag = frag.replace(/\$(\d)/g, (_, n) =>
    [
      ((centerX as number) || defaultCenterX) / 100,
      ((centerY as number) || defaultCenterY) / 100,
    ][n].toString()
  )

  const t = new Transition(sprite, { vert, frag: filledFrag })

  t.uniforms.smoothness = ((smoothness as number) || defaultSmoothness) / 100
  t.uniforms.opening = !reverse

  return t
}
