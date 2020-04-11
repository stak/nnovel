import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './slice.frag'

const directionPart: { [key: string]: string[] } = {
  right: ['vTextureCoord.x'],
  left: ['(1.0 - vTextureCoord.x)'],
  up: ['(1.0 - vTextureCoord.y)'],
  down: ['vTextureCoord.y'],
}

const defaultCount = 15
const defaultSmoothness = 0.5
const defaultDirection = 'right'

export function sliceTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const [direction, count, smoothness] = options

  const filledFrag = frag.replace(
    /\$(\d+)/g,
    (_, n) =>
      (directionPart[direction as string] || directionPart[defaultDirection])[n]
  )
  const t = new Transition(sprite, { vert, frag: filledFrag })

  t.uniforms.count = count || defaultCount
  t.uniforms.smoothness = smoothness || defaultSmoothness

  return t
}
