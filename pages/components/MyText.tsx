import React from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { Text, Graphics } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'

type Props = {
  x: number
  y: number
  text: string
}

// workaround to fix japanese chars height
PIXI.TextMetrics.BASELINE_SYMBOL += 'あ'

const style = new PIXI.TextStyle({
  fontFamily: 'Meiryo',
  fontSize: 30,
  fontStyle: 'normal',
  fontWeight: 'bold',
  fill: ['#dddddd', '#8877aa'], // gradient
  stroke: '#4a2840',
  strokeThickness: 3,
  letterSpacing: 1,
})

export const MyText: NextComponentType<NextPageContext, {}, Props> = ({
  x,
  y,
  text,
}) => {
  return (
    <>
      <Graphics
        draw={(g) => {
          g.clear()
          g.lineStyle(0, 0xffffff, 0.55)
          g.beginFill(0xffffff, 0.8)
          g.drawRoundedRect(110, 445, 640, 140, 15)
          g.endFill()
        }}
      />
      <Text style={style} x={x} y={y} text={text} />
    </>
  )
}
