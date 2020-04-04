import React, { useEffect } from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { Command, startScript, execScript } from '../../redux/scriptSlice'
import { RootState } from '../../redux/rootReducer'
import { commandActions } from '../../redux/commandActions'
import { NNStage } from './NNStage'

type Props = {
  script: Command[]
}

export const ScriptRunner: NextComponentType<NextPageContext, {}, Props> = ({
  script,
}) => {
  const nextCommand = useSelector(
    (state: RootState) => state.script.commands[state.script.pos]
  )
  const dispatch = useDispatch()
  const next = () => {
    dispatch(execScript())
  }

  // init
  useEffect(() => {
    dispatch(startScript(script))
  }, [script])

  // main loop
  useEffect(() => {
    console.log('Run')
    if (nextCommand) {
      if (Object.keys(commandActions).includes(nextCommand.name)) {
        const cmd = commandActions[nextCommand.name]
        const args = nextCommand.args
        dispatch(cmd(args))
      } else {
        console.log(Object.keys(commandActions))
        throw new Error('invalid command: ' + nextCommand.name)
      }
    } else {
      console.log('--EOS--')
    }
  }, undefined)

  return <NNStage next={next} />
}
