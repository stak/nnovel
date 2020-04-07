import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './slice.flag'

const defaultCount = 15
const defaultSmoothness = 0.5

export class SliceTransition extends Transition {
  constructor(sprite: Sprite) {
    super(sprite, { vert, frag })
  }

  setOptions(options: (number | string)[]): void {
    const [count, smoothness] = options
    this.uniforms.count = count || defaultCount
    this.uniforms.smoothness = smoothness || defaultSmoothness
  }
}
