import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { ScriptRunner } from './ScriptRunner'
import { Command } from '../../redux/scriptSlice'

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
  return <ScriptRunner script={sampleCmds} />
}

export default Game
