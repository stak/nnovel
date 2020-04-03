import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { useSelector } from 'react-redux'
import { MyText } from './MyText'
import { RootState } from '../../redux/rootReducer'

type Props = {
  next: () => void
}

export const ScriptStage: NextComponentType<NextPageContext, {}, Props> = ({
  next,
}) => {
  const state = useSelector((state: RootState) => state)

  return (
    <>
      <MyText
        text={state.text.current}
        x={130}
        y={450}
        onComplete={() => next()}
      />
    </>
  )
}
