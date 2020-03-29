import React from 'react'
import { Container, Sprite } from '@inlet/react-pixi'
import { NextComponentType, NextPageContext } from 'next'

type Layer = {
  src: string
  x: number
  y: number
}

type Props = {
  layers: Layer[]
}

const MyContainer: NextComponentType<NextPageContext, {}, Props> = ({
  layers,
}) => {
  return (
    <Container>
      {layers.map((layer) => (
        <Sprite key={layer.src} image={layer.src} x={layer.x} y={layer.y} />
      ))}
    </Container>
  )
}

export default MyContainer
