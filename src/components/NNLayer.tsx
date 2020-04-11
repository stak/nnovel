import React from 'react'
import { Sprite } from '@inlet/react-pixi'
import { NextComponentType, NextPageContext } from 'next'
import { useSpring, animated } from 'react-spring'

export type LayerProp = {
  src: string
  x: number
  y: number
  anim?: {}
}

const AnimatedSprite = animated(Sprite)

type Props = LayerProp

export const NNLayer: NextComponentType<NextPageContext, {}, Props> = ({
  src,
  x,
  y,
}) => {
  const animProps = useSpring({
    x,
    y,
  })

  return (
    <AnimatedSprite
      key={src}
      image={src}
      x={animProps.x || x}
      y={animProps.y || y}
    />
  )
}
