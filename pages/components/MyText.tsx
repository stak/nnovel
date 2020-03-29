import React, { useEffect, useState } from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { Text } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'

type Props = {
  x: number
  y: number
  text: string
}

// workaround to fix japanese chars height
PIXI.TextMetrics.BASELINE_SYMBOL += 'あ'

const style = new PIXI.TextStyle({
  fontFamily: 'GameFont',
  fontSize: 32,
  fontStyle: 'normal',
  fontWeight: 'bold',
  fill: ['#ffffff', '#99aacc'], // gradient
  stroke: '#4a1850',
  strokeThickness: 3,
  wordWrap: true,
  wordWrapWidth: 440,
  letterSpacing: 1,
})

export const MyText: NextComponentType<NextPageContext, {}, Props> = ({
  x,
  y,
  text,
}) => {
  const [renderable, setRenderable] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setRenderable(true)
    }, 100)
  }, [])
  return renderable ? <Text style={style} x={x} y={y} text={text} /> : null
}
