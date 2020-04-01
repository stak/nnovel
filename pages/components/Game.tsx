import React from 'react'
import { Stage } from '@inlet/react-pixi'
import { NextComponentType, NextPageContext } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { MyText } from './MyText'
import { Button } from './Button'
import { setText } from '../../redux/textSlice'
import { RootState } from '../../redux/rootReducer'

const stageOption = {
  width: 800,
  height: 600,
  transparent: true,
  antialias: false,
  sharedTicker: false,
}

const sampleTexts = [
  'むかしむかし、あるところにーー',
  'いやそういう問題ではない。',
  '何が起こっているのかを明確にせよ。\nそして、自身に問うのだ。',
  '果たしてこれは、お前の望んだ結末なのか？　と。',
]
let i = 0

type Props = {}

const Game: NextComponentType<NextPageContext, {}, Props> = () => {
  const text = useSelector((state: RootState) => state.text.current)
  const dispatch = useDispatch()

  return (
    <Stage options={stageOption}>
      <MyText text={text} x={130} y={450} />
      <Button
        image="/img/emo17_02.png"
        x={0}
        y={530}
        onClick={() => {
          dispatch(setText(sampleTexts[i++]))
        }}
      />
    </Stage>
  )
}

export default Game
