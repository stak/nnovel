import React, { useState } from 'react'
import { NextComponentType, NextPageContext } from 'next'
import { NNEngine } from './NNEngine'
import { Command } from '../redux/scriptSlice'
import { nnParser } from './parser'
import * as NNScripts from '../ns'

const parse = (src: string): Command[] => nnParser.script.tryParse(src)

type Props = {}

const Game: NextComponentType<NextPageContext, {}, Props> = () => {
  const [script, setScript] = useState(parse(NNScripts.index))

  return (
    <div style={{ display: 'flex' }}>
      <ul
        style={{
          background: '#000000',
          minWidth: '140px',
          listStyleType: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {Object.entries(NNScripts).map(([name, src]) => {
          return (
            <a
              key={name}
              href="#"
              style={{
                textDecoration: 'none',
                textAlign: 'center',
              }}
              onClick={() => {
                const scriptCommands = parse(src)
                setScript(scriptCommands)
              }}
            >
              <li
                style={{
                  color: 'white',
                  padding: '2px',
                  backgroundColor: 'rgba(255,255,255,0.3)',
                }}
              >
                {name}
              </li>
            </a>
          )
        })}
      </ul>
      <NNEngine script={script} />
    </div>
  )
}

export default Game
