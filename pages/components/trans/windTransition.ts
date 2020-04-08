import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './wind.flag'

const directionPart: { [key: string]: string[] } = {
  right: ['vTextureCoord.y', 'vTextureCoord.x'],
  left: ['vTextureCoord.y', '(1.0 - vTextureCoord.x)'],
  up: ['vTextureCoord.x', '(1.0 - vTextureCoord.y)'],
  down: ['vTextureCoord.x', 'vTextureCoord.y'],
}

const defaultDirection = 'right'
const defaultSize = 20

export function windTransition(
  sprite: Sprite,
  options: (number | string)[]
): Transition {
  const [direction, size] = options

  const filledFrag = frag.replace(
    /\$(\d+)/g,
    (_, n) =>
      (directionPart[direction as string] || directionPart[defaultDirection])[n]
  )
  const t = new Transition(sprite, { vert, frag: filledFrag })

  t.uniforms.size = ((size as number) || defaultSize) / 100

  return t
}
