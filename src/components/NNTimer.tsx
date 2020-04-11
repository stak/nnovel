import React, { useRef } from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { useTick } from '@inlet/react-pixi'

type Props = {
  time: number
  onComplete: () => void
}

const FPS = 60

export const NNTimer: NextComponentType<NextPageContext, {}, Props> = ({
  time,
  onComplete,
}) => {
  const elapsed = useRef(0)

  useTick((delta) => {
    elapsed.current += delta || 0

    if ((elapsed.current * 1000) / FPS >= time) {
      onComplete()
    }
  })

  return <></>
}
