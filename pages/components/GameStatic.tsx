import React, { useState } from 'react'
import { Stage } from '@inlet/react-pixi'
import { NextComponentType, NextPageContext } from 'next'
import { MyContainer } from './MyContainer'
import { Button } from './Button'
import { NNText } from './NNText'

const stageOption = {
  width: 800,
  height: 600,
  transparent: true,
  antialias: false,
  sharedTicker: false,
}

type Props = {}

const Game: NextComponentType<NextPageContext, {}, Props> = () => {
  const bgLayer = { src: '/img/bg1.png', x: 0, y: 0 }
  const arieLayer = { src: '/img/arie.png', x: 100, y: 0 }
  // const arie2Layer = { src: '/img/arie.png', x: 200, y: 0 }
  const [layers, setLayers] = useState([bgLayer, arieLayer])
  const [toggle, setToggle] = useState(false)

  return (
    <Stage options={stageOption}>
      <MyContainer layers={layers} />
      <NNText
        onComplete={() => void 0}
        updateType="set"
        text={'そんなこと、言わないでよね。'}
        x={130}
        y={450}
      />
      <Button
        image="/img/emo17_02.png"
        x={0}
        y={530}
        onClick={() => {
          if (toggle) {
            setLayers([bgLayer, arieLayer])
          } else {
            setLayers([bgLayer, { ...arieLayer, x: 300 }])
          }
          setToggle(!toggle)
        }}
      />
    </Stage>
  )
}

export default Game
