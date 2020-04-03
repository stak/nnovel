import React, { useEffect } from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { Command, startScript, execScript } from '../../redux/scriptSlice'
import { RootState } from '../../redux/rootReducer'
import { commandActions } from '../../redux/commandActions'
import { ScriptStage } from './ScriptStage'

type Props = {
  script: Command[]
}

export const ScriptRunner: NextComponentType<NextPageContext, {}, Props> = ({
  script,
}) => {
  const currentCommand = useSelector(
    (state: RootState) => state.script.commands[state.script.pos]
  )
  const dispatch = useDispatch()
  const next = () => {
    dispatch(execScript())
  }
  useEffect(() => {
    dispatch(startScript(script))
  }, [script])

  useEffect(() => {
    console.log('Runner')
    if (currentCommand) {
      if (Object.keys(commandActions).includes(currentCommand.name)) {
        const cmd = commandActions[currentCommand.name]
        const args = currentCommand.args
        dispatch(cmd(args))
      } else {
        console.log(Object.keys(commandActions))
        throw new Error('invalid command')
      }
    }
  }, undefined)

  return <ScriptStage next={next} />
}
