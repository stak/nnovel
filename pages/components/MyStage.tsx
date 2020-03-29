import React from 'react'
import { Stage, Sprite } from '@inlet/react-pixi'

const stageOption = {
  width: 800,
  height: 600,
  transparent: true,
  antialias: false,
  sharedTicker: false,
}

type Props = {}
const MyStage: React.FC<Props> = () => (
  <Stage options={stageOption}>
    <Sprite image="/img/bg1.png" x={0} y={0} />
    <Sprite image="/img/arie.png" x={100} y={0} />
  </Stage>
)

export default MyStage
