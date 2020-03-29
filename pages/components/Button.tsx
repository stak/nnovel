import React, { useState } from 'react'
import { Sprite } from '@inlet/react-pixi'
import { NextComponentType, NextPageContext } from 'next'

type Props = {
  x: number
  y: number
  image: string
  onClick: () => void
}

const ALPHA_DEFAULT = 0.7
const ALPHA_HOVER = 1.0

const Button: NextComponentType<NextPageContext, {}, Props> = ({
  x,
  y,
  image,
  onClick,
}) => {
  const [alpha, setAlpha] = useState(ALPHA_DEFAULT)

  return (
    <Sprite
      image={image}
      alpha={alpha}
      x={x}
      y={y}
      interactive={true}
      pointertap={onClick}
      pointerover={() => {
        setAlpha(ALPHA_HOVER)
      }}
      pointerout={() => {
        setAlpha(ALPHA_DEFAULT)
      }}
    />
  )
}

export default Button
