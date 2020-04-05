import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { NNEngine } from './NNEngine'
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
オラオラオラオラオラオラオラオラオラオラ

/waitTrans
いい感じですね？@

/readyBg "/img/bg1.png"
/readyLayer 0 "/img/arie.png" 0 0
/trans "flyeye" 1000
/waitTrans
/readyBg "/img/whiteout"
/readyLayer 0 "/img/arie.png" 300 0
/trans "flyeye" 1000
/waitTrans
/readyBg "/img/bg1.png"
/readyLayer 0 "/img/arie.png" 50 0
/trans "flyeye" 1000
/waitTrans
/readyBg "/img/whiteout"
/readyLayer 0 "/img/arie.png" 100 0
/trans "flyeye" 1000
/waitTrans

`) as Command[]

type Props = {}

const Game: NextComponentType<NextPageContext, {}, Props> = () => {
  return <NNEngine script={sampleCmds} />
}

export default Game
