import React, { useEffect, useState, useRef } from 'react'
import { RenderTexture, Sprite, DisplayObject } from 'pixi.js'
import { useApp, useTick } from '@inlet/react-pixi'
import { NextComponentType, NextPageContext } from 'next'

import { TransMethod, LayerSetState } from '../../redux/gameSlice'
import * as transition from './transition'
import { Transition } from './transition/Transition'

type Props = {
  Component: NextComponentType<NextPageContext, {}, any>
  foreProps: {
    state: LayerSetState
    onTextComplete: () => void
  }
  backProps: {
    state: LayerSetState
    onTextComplete: () => void
  }
  onTransComplete: () => void

  time: number
  method: TransMethod
  options?: (string | number)[]
}

export const NNTransition: NextComponentType<NextPageContext, {}, Props> = ({
  Component,
  foreProps,
  backProps,
  onTransComplete,

  time,
  method,
  options = [],
}) => {
  const app = useApp()
  const [flip, setFlip] = useState(false)
  const refA = useRef<DisplayObject>()
  const refB = useRef<DisplayObject>()

  const texture = useRef(
    RenderTexture.create({
      width: app.screen.width,
      height: app.screen.height,
    })
  )
  const tmpSprite = useRef(new Sprite(texture.current))
  const filter = useRef<Transition>()

  const elapsed = useRef(0)
  useTick((delta) => {
    if (filter.current) {
      elapsed.current += delta || 0

      const toInstance = (flip ? refA.current : refB.current) as DisplayObject

      // dirty workaround...
      toInstance.renderable = true
      app.renderer.render(toInstance, texture.current)
      toInstance.renderable = false

      const progress = elapsed.current / (time / 60)
      if (progress < 1) {
        filter.current.uniforms.progress = progress
      } else {
        // transition end
        filter.current = undefined
        const fromInstance = (flip
          ? refB.current
          : refA.current) as DisplayObject
        fromInstance.filters = []
        foreProps.onTextComplete()

        setFlip(!flip)
        onTransComplete()
      }
    }
  })

  useEffect(() => {
    const fromInstance = (flip ? refB.current : refA.current) as DisplayObject

    if (Object.keys(transition).includes(method)) {
      if (method === 'flyeye') {
        filter.current = new transition.flyeye(tmpSprite.current)
      } else if (method === 'crossfade') {
        filter.current = new transition.crossfade(tmpSprite.current)
      } else if (method === 'slice') {
        filter.current = new transition.slice(tmpSprite.current)
      } else {
        filter.current = new transition.crossfade(tmpSprite.current)
      }
      fromInstance.filters = [filter.current]

      filter.current.uniforms.progress = 0
      filter.current.setOptions(options)
      elapsed.current = 0
    }
  }, [time, method])

  return flip ? (
    <>
      <Component key="A" {...backProps} _ref={refA} renderable={false} />
      <Component key="B" {...foreProps} _ref={refB} renderable={true} />
    </>
  ) : (
    <>
      <Component key="A" {...foreProps} _ref={refA} renderable={true} />
      <Component key="B" {...backProps} _ref={refB} renderable={false} />
    </>
  )
}
