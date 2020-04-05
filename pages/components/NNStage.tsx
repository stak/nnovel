import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { Stage } from '@inlet/react-pixi'

import { NNScreen } from './NNScreen'
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
      <NNScreen
        state={state.layer.back}
        renderable={false}
        onTextComplete={() => void 0}
      />
      <NNScreen
        state={state.layer.fore}
        renderable={true}
        onTextComplete={() => {
          if (state.wait.waitType === 'text') {
            console.log('onTextComplete')
            dispatch(waitDone())
            next()
          }
        }}
      />

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
