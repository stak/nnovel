import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { MyText } from './MyText'
import { RootState } from '../../redux/rootReducer'
import { Stage } from '@inlet/react-pixi'
import { Button } from './Button'
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

export const ScriptStage: NextComponentType<NextPageContext, {}, Props> = ({
  next,
}) => {
  const state = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  return (
    <Stage options={stageOption}>
      <MyText
        text={state.text.current}
        x={130}
        y={450}
        onComplete={() => {
          console.log('onTextComplete')
          next()
        }}
      />
      {state.wait.waitType === 'click' ? (
        <Button
          image="/img/emo17_02.png"
          x={0}
          y={530}
          onClick={() => {
            console.log('onClick')
            dispatch(waitDone())
            next()
          }}
        />
      ) : null}
    </Stage>
  )
}
