import React, { useEffect } from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { Command, startScript, execScript } from '../redux/scriptSlice'
import { gameInit } from '../redux/gameSlice'
import { RootState } from '../redux/rootReducer'
import { commandActionCreators } from '../redux/commandActions'
import { NNStage } from './NNStage'

type Props = {
  script: Command[]
}

export const NNEngine: NextComponentType<NextPageContext, {}, Props> = ({
  script,
}) => {
  const nextCommand = useSelector(
    (state: RootState) => state.script.commands[state.script.pos]
  )
  const dispatch = useDispatch()
  const next = () => {
    dispatch(execScript())
  }

  let isInit = false

  // init
  useEffect(() => {
    console.log('Init')
    dispatch(gameInit())
    dispatch(startScript(script))
    isInit = true
  }, [script])

  // main loop
  useEffect(() => {
    if (isInit) {
      return
    }
    console.log('Main')
    if (nextCommand) {
      if (Object.keys(commandActionCreators).includes(nextCommand.name)) {
        const cmd = commandActionCreators[nextCommand.name]
        const args = nextCommand.args
        const action = cmd(args)
        dispatch(action)

        if (action.type.slice(0, 9) === 'game/wait') {
          // wait 系コマンド実行時、待ちに入る
          // <NNStage> 下のコンポーネントが next を呼ぶことで継続する
        } else {
          next()
        }
      } else {
        console.log(nextCommand)
        throw new Error('invalid command: ' + nextCommand.name)
      }
    } else {
      console.log('--EOS--')
    }
  }, undefined)

  return <NNStage next={next} />
}
