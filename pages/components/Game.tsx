import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { ScriptRunner } from './ScriptRunner'
import { Command } from '../../redux/scriptSlice'

const sampleCmds: Command[] = [
  {
    name: 'setText',
    args: ['むかしむかし、あるところに――'],
  },
  {
    name: 'waitText',
    args: [],
  },
  {
    name: 'waitClick',
    args: [],
  },
  {
    name: 'showBg',
    args: ['/img/bg1.png'],
  },
  {
    name: 'setText',
    args: ['いやそういう問題ではない。'],
  },
  {
    name: 'waitText',
    args: [],
  },
  {
    name: 'waitClick',
    args: [],
  },
  {
    name: 'setText',
    args: ['何が起こっているのかを明確にせよ。'],
  },
  {
    name: 'waitText',
    args: [],
  },
  {
    name: 'waitClick',
    args: [],
  },
  {
    name: 'appendText',
    args: ['\nそして、自身に問うのだ。'],
  },
  {
    name: 'waitText',
    args: [],
  },
  {
    name: 'waitClick',
    args: [],
  },
  {
    name: 'setText',
    args: ['果たしてこれは、お前の望んだ結末なのか？'],
  },
  {
    name: 'waitText',
    args: [],
  },
]

type Props = {}

const Game: NextComponentType<NextPageContext, {}, Props> = () => {
  return <ScriptRunner script={sampleCmds} />
}

export default Game
