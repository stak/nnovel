import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './flyeye.flag'

const defaultSize = 0.04
const defaultZoom = 10.0
const defaultColorSeparation = 0.3

export class FlyeyeTransition extends Transition {
  constructor(sprite: Sprite) {
    super(sprite, { vert, frag })
  }

  setOptions(options: (number | string)[]): void {
    const [size, zoom, colorSeparation] = options
    this.uniforms.size = size || defaultSize
    this.uniforms.zoom = zoom || defaultZoom
    this.uniforms.colorSeparation = colorSeparation || defaultColorSeparation
  }
}
