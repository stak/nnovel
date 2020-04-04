import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { ScriptRunner } from './ScriptRunner'
import { Command } from '../../redux/scriptSlice'

const sampleCmds: Command[] = [
  {
    name: 'setText',
    args: ['むかしむかし、'],
  },
  {
    name: 'waitTime',
    args: [1000],
  },
  {
    name: 'appendText',
    args: ['あるところに――'],
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
    name: 'showLayer',
    args: [0, '/img/arie.png', 200, 0],
  },
  {
    name: 'setText',
    args: ['って、うるさーーーーい！'],
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
    name: 'showLayer',
    args: [0, '/img/arie.png', 300, 0],
  },
  {
    name: 'setText',
    args: ['うるさい、'],
  },
  {
    name: 'waitText',
    args: [],
  },
  {
    name: 'moveLayer',
    args: [0, 0, 0],
  },
  {
    name: 'appendText',
    args: ['うるさい、'],
  },
  {
    name: 'waitText',
    args: [],
  },
  {
    name: 'moveLayer',
    args: [0, 300, 0],
  },
  {
    name: 'appendText',
    args: ['うるさ～い！'],
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
