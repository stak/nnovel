import React, { useEffect, useState, useRef } from 'react'
import { RenderTexture, Sprite, DisplayObject, Filter } from 'pixi.js'
import { Container, useApp, useTick } from '@inlet/react-pixi'
import { NextComponentType, NextPageContext, NextPage } from 'next'

import { TransMethod } from '../../redux/layerSlice'
import { FlyeyeTransition } from './transition/FlyeyeTransition'

type Props = {
  Component: NextComponentType<NextPageContext, {}, any>
  foreProps: {}
  backProps: {}

  time: number
  method: TransMethod
  option?: {}
}

export const NNTransition: NextComponentType<NextPageContext, {}, Props> = ({
  Component,
  foreProps,
  backProps,

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

      const pixiObject = (flip ? refA.current : refB.current) as DisplayObject
      app.renderer.render(pixiObject, texture.current)

      const progress = elapsed.current / (time / 60)
      if (progress < 1) {
        filter.current.uniforms.progress = progress
      } else {
        // transition end
        filter.current = undefined
      }
    }
  })

  useEffect(() => {
    const fromInstance = (flip ? refB.current : refA.current) as DisplayObject

    if (method === 'flyeye') {
      filter.current = new FlyeyeTransition(tmpSprite.current)
      fromInstance.filters = [filter.current]

      filter.current.uniforms.progress = 0
      elapsed.current = 0
    }
  }, [time, method])

  return flip ? (
    <>
      <Container renderable={false}>
        <Component key="A" {...backProps} _ref={refA} />
      </Container>
      <Component key="B" {...foreProps} _ref={refB} />
    </>
  ) : (
    <>
      <Component key="A" {...foreProps} _ref={refA} />
      <Container renderable={false}>
        <Component key="B" {...backProps} _ref={refB} />
      </Container>
    </>
  )
}
