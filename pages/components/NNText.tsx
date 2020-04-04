import React, { useState, useRef, useEffect } from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { Text, Graphics, useTick } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'

type Props = {
  x: number
  y: number
  text: string
  updateType: string
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
const TEXT_SPEED = 20 // chars per second
const FPS = 60

export const NNText: NextComponentType<NextPageContext, {}, Props> = ({
  x,
  y,
  text,
  updateType,
  onComplete,
}) => {
  const [drawLength, setDrawLength] = useState(0)
  const [complete, setComplete] = useState(false)
  const iter = useRef(0)

  useEffect(() => {
    if (updateType === 'set') {
      setDrawLength(0)
    }
    setComplete(false)
  }, [text])

  useEffect(() => {
    if (drawLength >= text.length) {
      setComplete(true)
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
      {complete && (
        <Graphics
          draw={(g) => {
            g.clear()
            g.lineStyle(0, 0xffffff, 0.55)
            g.beginFill(0x888888, 0.8)
            g.drawRoundedRect(740, 545, 30, 30, 5)
            g.endFill()
          }}
        />
      )}
    </>
  )
}
