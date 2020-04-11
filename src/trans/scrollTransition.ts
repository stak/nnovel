import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './scroll.frag'

const directionPart: { [key: string]: string[] } = {
  right: ['vec2(-1.0, 0.0)'],
  left: ['vec2(1.0, 0.0)'],
  up: ['vec2(0.0, 1.0)'],
  down: ['vec2(0.0, -1.0)'],
}

const defaultDirection = 'right'
const defaultStayFore = false
const defaultStayBack = false

export function scrollTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const [direction, stayFore, stayBack] = options

  const filledFrag = frag.replace(
    /\$(\d+)/g,
    (_, n) =>
      (directionPart[direction as string] || directionPart[defaultDirection])[n]
  )
  const t = new Transition(sprite, { vert, frag: filledFrag })

  t.uniforms.stayFore = !!stayFore || defaultStayFore
  t.uniforms.stayBack = !!stayBack || defaultStayBack

  return t
}
