import React, { useState, useRef, useEffect } from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { Text, Graphics, useTick } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'
import { sleep } from './utils'

type Props = {
  x: number
  y: number
  text: string
  onComplete: () => void
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
const TEXT_SPEED = 10 // 一秒に n 文字
const FPS = 60

export const MyText: NextComponentType<NextPageContext, {}, Props> = ({
  x,
  y,
  text,
  onComplete,
}) => {
  const [drawLength, setDrawLength] = useState(0)
  const iter = useRef(0)

  useEffect(() => {
    setDrawLength(0)
  }, [text])

  useEffect(() => {
    if (drawLength >= text.length) {
      console.log(text, drawLength)
      onComplete()
    }
  }, [drawLength])

  useTick((delta) => {
    iter.current += delta || 0
    let add = 0
    while (iter.current >= FPS / TEXT_SPEED) {
      iter.current -= FPS / TEXT_SPEED
      add += 1
    }
    if (drawLength < text.length) {
      if (add) {
        setDrawLength(drawLength + add)
      }
    }
  })

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
      <Text style={style} x={x} y={y} text={text.slice(0, drawLength)} />
    </>
  )
}
