import { flyeyeTransition } from './flyeyeTransition'
import { crossfadeTransition } from './crossfadeTransition'
import { sliceTransition } from './sliceTransition'
import { blurTransition } from './blurTransition'
import { universalTransition } from './universalTransition'
import { windTransition } from './windTransition'

import { Transition } from './Transition'
import { Sprite } from 'pixi.js'

export const trans: {
  [key: string]: (sprite: Sprite, options: (number | string)[]) => Transition
} = {
  crossfade: crossfadeTransition,
  universal: universalTransition,
  slice: sliceTransition,
  flyeye: flyeyeTransition,
  blur: blurTransition,
  wind: windTransition,
}
