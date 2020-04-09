import { Sprite } from 'pixi.js'
import { Transition } from './Transition'

import { flyeyeTransition } from './flyeyeTransition'
import { crossfadeTransition } from './crossfadeTransition'
import { sliceTransition } from './sliceTransition'
import { blurTransition } from './blurTransition'
import { universalTransition } from './universalTransition'
import { windTransition } from './windTransition'
import { randsquareTransition } from './randsquareTransition'
import { pixelizeTransition } from './pixelizeTransition'
import { wipeTransition } from './wipeTransition'
import { circleTransition } from './circleTransition'

export const trans: {
  [key: string]: (sprite: Sprite, options: (number | string)[]) => Transition
} = {
  crossfade: crossfadeTransition,
  universal: universalTransition,
  slice: sliceTransition,
  flyeye: flyeyeTransition,
  blur: blurTransition,
  wind: windTransition,
  randsquare: randsquareTransition,
  pixelize: pixelizeTransition,
  wipe: wipeTransition,
  circle: circleTransition,
}
