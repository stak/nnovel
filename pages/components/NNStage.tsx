import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { Stage, Container } from '@inlet/react-pixi'

import { NNText } from './NNText'
import { NNLayer } from './NNLayer'
import { NNTimer } from './NNTimer'
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
  const fore = state.layer.fore
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
        {fore.base && (
          <NNLayer src={fore.base.src} x={fore.base.x} y={fore.base.y} />
        )}
        {fore.layers.map((layer) =>
          layer ? (
            <NNLayer key={layer.id} src={layer.src} x={layer.x} y={layer.y} />
          ) : null
        )}
        <NNText
          text={fore.message.current}
          updateType={fore.message.updateType}
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

      {state.wait.waitType === 'time' && (
        <NNTimer
          time={state.wait.time}
          onComplete={() => {
            console.log('onTimerComplete')
            dispatch(waitDone())
            next()
          }}
        />
      )}
    </Stage>
  )
}
