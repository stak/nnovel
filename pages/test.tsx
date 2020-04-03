import React from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const MyStageNoSSR = dynamic(() => import('./components/GameStatic'), {
  ssr: false,
})

type Props = {}
const Home: NextPage<Props> = () => <MyStageNoSSR />

export default Home
