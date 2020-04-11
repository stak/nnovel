import React, { useEffect } from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { Stage } from '@inlet/react-pixi'

import { NNScreen } from './NNScreen'
import { NNTimer } from './NNTimer'
import { RootState } from '../redux/rootReducer'
import { transDone, waitDone } from '../redux/gameSlice'
import { NNTransition } from './NNTransition'

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
  const $wait = useSelector((state: RootState) => state.game.wait)
  const $screen = useSelector((state: RootState) => state.game.screen)
  const dispatch = useDispatch()

  useEffect(() => {
    if ($wait.waitNone) {
      console.log('onNone')
      dispatch(waitDone(['none']))
      next()
    }
  }, [$wait.waitNone])

  return (
    <Stage
      options={stageOption}
      onPointerDown={() => {
        if ($wait.waitClick) {
          console.log('onClick')
          dispatch(waitDone(['click']))
          next()
        }
      }}
      onContextMenu={(event) => {
        event.preventDefault()
      }}
    >
      <NNTransition
        Component={NNScreen}
        method={$screen.trans.method}
        time={$screen.trans.time}
        options={$screen.trans.options}
        foreProps={{
          state: $screen.fore,
          onTextComplete: () => {
            if ($wait.waitText) {
              console.log('onTextComplete')
              dispatch(waitDone(['text']))
              next()
            }
          },
        }}
        backProps={{ state: $screen.back, onTextComplete: () => void 0 }}
        onTransComplete={() => {
          dispatch(transDone())
          if ($wait.waitTrans) {
            console.log('onTransComplete')
            dispatch(waitDone(['trans']))
            next()
          }
        }}
      />

      {$wait.waitTime && (
        <NNTimer
          time={$wait.time}
          onComplete={() => {
            console.log('onTimerComplete')
            dispatch(waitDone(['time']))
            next()
          }}
        />
      )}
    </Stage>
  )
}
