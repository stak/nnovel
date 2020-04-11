import React, { useEffect, useState, useRef } from 'react'
import { RenderTexture, Sprite, DisplayObject } from 'pixi.js'
import { useApp, useTick } from '@inlet/react-pixi'
import { NextComponentType, NextPageContext } from 'next'

import { LayerSetState } from '../../redux/gameSlice'
import { trans } from './trans'
import { Transition } from './trans/Transition'
import { easing } from './easing'

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
  method: string
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

      const linearProgress = Math.min(
        (elapsed.current * 60 * 60) / (app.ticker.FPS * time),
        1
      )

      const progress = easing.linear(linearProgress)
      if (linearProgress < 1) {
        filter.current.uniforms.progress = progress
      } else {
        // transition complete
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

    if (Object.keys(trans).includes(method)) {
      filter.current = trans[method](tmpSprite.current, options)
      fromInstance.filters = [filter.current]

      filter.current.uniforms.progress = 0
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
