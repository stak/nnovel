import React from 'react'
import { Container } from '@inlet/react-pixi'
import { NextComponentType, NextPageContext } from 'next'
import { NNLayer } from './NNLayer'
import { NNText } from './NNText'
import { LayerScreenState } from '../../redux/layerSlice'

type Props = {
  state: LayerScreenState
  onTextComplete: () => void
  renderable: boolean
  _ref: React.RefObject<React.Component>
}

export const NNScreen: NextComponentType<NextPageContext, {}, Props> = ({
  state: { base, layers, message },
  onTextComplete,
  renderable,
  _ref,
}) => {
  return (
    <Container renderable={renderable} ref={_ref}>
      {base && <NNLayer src={base.src} x={base.x} y={base.y} />}
      {layers.map((layer) =>
        layer ? (
          <NNLayer key={layer.id} src={layer.src} x={layer.x} y={layer.y} />
        ) : null
      )}
      <NNText
        text={message.current}
        updateType={message.updateType}
        x={130}
        y={450}
        onComplete={onTextComplete}
      />
    </Container>
  )
}
