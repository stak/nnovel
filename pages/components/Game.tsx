import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { ScriptRunner } from './ScriptRunner'
import { Command } from '../../redux/scriptSlice'
import { nnParser } from './parser'

const sampleCmds: Command[] = nnParser.script.tryParse(`
/showBg "/img/bg1.png"
/showLayer 0 "/img/arie.png" 200 0

こんにちは。\\

/readyBg "/img/bg2.jpg"
/readyLayer 0 "/img/arie.png" 200 0
/trans "flyeye" 3000

/moveLayer 0 -500 0
/waitTime 400
/moveLayer 0 300 0
/waitTime 400

いい感じですね？\\

`) as Command[]

type Props = {}

const Game: NextComponentType<NextPageContext, {}, Props> = () => {
  return <ScriptRunner script={sampleCmds} />
}

export default Game
