import React from 'react'
import { Container } from '@inlet/react-pixi'
import { NextComponentType, NextPageContext } from 'next'
import { NNLayer } from './NNLayer'

type LayerProp = {
  src: string
  x: number
  y: number
}

type Props = {
  layers: LayerProp[]
}

export const MyContainer: NextComponentType<NextPageContext, {}, Props> = ({
  layers,
}) => {
  return (
    <Container>
      {layers.map((layer) => (
        <NNLayer key={layer.src} src={layer.src} x={layer.x} y={layer.y} />
      ))}
    </Container>
  )
}
