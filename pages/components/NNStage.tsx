import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { Stage, Container } from '@inlet/react-pixi'

import { NNText } from './NNText'
import { NNLayer } from './NNLayer'
import { RootState } from '../../redux/rootReducer'
import { waitDone } from '../../redux/waitSlice'

const stageOption = {
  width: 800,
  height: 600,
  transparent: true,
  antialias: false,
  sharedTicker: false,
}

type Props = {
  next: () => void
}

export const NNStage: NextComponentType<NextPageContext, {}, Props> = ({
  next,
}) => {
  const state = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  return (
    <Stage
      options={stageOption}
      onClick={() => {
        if (state.wait.waitType === 'click') {
          console.log('onClick')
          dispatch(waitDone())
          next()
        }
      }}
      onContextMenu={(event) => {
        event.preventDefault()
      }}
    >
      <Container>
        {state.layer.fore.base && (
          <NNLayer
            src={state.layer.fore.base.src}
            x={state.layer.fore.base.x}
            y={state.layer.fore.base.y}
          />
        )}
        {state.layer.fore.layers.map((layer, i) => (
          <NNLayer
            key={`fore.layers[${i}]`}
            src={layer.src}
            x={layer.x}
            y={layer.y}
          />
        ))}
        <NNText
          text={state.text.current}
          updateType={state.text.updateType}
          x={130}
          y={450}
          onComplete={() => {
            if (state.wait.waitType === 'text') {
              console.log('onTextComplete')
              dispatch(waitDone())
              next()
            }
          }}
        />
      </Container>
    </Stage>
  )
}
