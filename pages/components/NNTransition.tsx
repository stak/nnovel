import React, { useEffect, useState, useRef } from 'react'
import { RenderTexture, Sprite, DisplayObject, Filter } from 'pixi.js'
import { useApp, useTick } from '@inlet/react-pixi'
import { NextComponentType, NextPageContext } from 'next'

import { TransMethod, LayerSetState } from '../../redux/gameSlice'
import * as transition from './transition'

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
  option?: {}
}

export const NNTransition: NextComponentType<NextPageContext, {}, Props> = ({
  Component,
  foreProps,
  backProps,
  onTransComplete,

  time,
  method,
  option = {},
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
  const filter = useRef<Filter>()

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
      let trans = transition.crossfade
      if (method === 'flyeye') {
        trans = transition.flyeye
      } else if (method === 'crossfade') {
        trans = transition.crossfade
      }
      filter.current = new trans(tmpSprite.current)
      fromInstance.filters = [filter.current]

      filter.current.uniforms.progress = 0
      for (const [k, v] of Object.entries(option)) {
        filter.current.uniforms[k] = v // apply filter options
      }
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
