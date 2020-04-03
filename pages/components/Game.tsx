import React from 'react'
import { Stage } from '@inlet/react-pixi'
import { NextComponentType, NextPageContext } from 'next'
import { ScriptRunner } from './ScriptRunner'
import { Command } from '../../redux/scriptSlice'

const stageOption = {
  width: 800,
  height: 600,
  transparent: true,
  antialias: false,
  sharedTicker: false,
}

const sampleCmds: Command[] = [
  {
    name: 'setText',
    args: ['むかしむかし、あるところにーー'],
  },
  {
    name: 'waitClick',
    args: [],
  },
  {
    name: 'setText',
    args: ['いやそういう問題ではない。'],
  },
  {
    name: 'waitClick',
    args: [],
  },
  {
    name: 'setText',
    args: ['何が起こっているのかを明確にせよ。\nそして、自身に問うのだ。'],
  },
  {
    name: 'waitClick',
    args: [],
  },
  {
    name: 'setText',
    args: ['果たしてこれは、お前の望んだ結末なのか？'],
  },
]

type Props = {}

const Game: NextComponentType<NextPageContext, {}, Props> = () => {
  return (
    <Stage options={stageOption}>
      <ScriptRunner script={sampleCmds} />
    </Stage>
  )
}

export default Game
