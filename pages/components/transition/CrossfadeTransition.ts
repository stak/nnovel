import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import vert from './base.vert'
import frag from './crossfade.flag'

export class CrossfadeTransition extends Transition {
  constructor(sprite: Sprite) {
    super(sprite, { vert, frag })
  }

  setOptions(): void {
    return
  }
}
