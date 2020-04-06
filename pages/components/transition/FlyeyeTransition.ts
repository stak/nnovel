import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './flyeye.flag'

export class FlyeyeTransition extends Transition {
  constructor(sprite: Sprite) {
    super(sprite, { vert, frag })
  }
}
