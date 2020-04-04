import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { NNText } from './NNText'
import { RootState } from '../../redux/rootReducer'
import { Stage } from '@inlet/react-pixi'
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
      <NNText
        text={state.text.current}
        updateType={state.text.updateType}
        x={130}
        y={450}
        onComplete={() => {
          console.log('onTextComplete')
          next()
        }}
      />
    </Stage>
  )
}
