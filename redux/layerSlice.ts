import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'

export type LayerState = {
  id: string
  src: string

  alpha: number
  x: number
  y: number
}

export type MessageLayerState = {
  history: string[]
  current: string
  updateType: 'set' | 'append'
}

export type LayerScreenState = {
  base: LayerState | null
  layers: LayerState[]
  message: MessageLayerState
}

// Enum
export const transMethods = {
  None: '',
  Crossfade: 'crossfade',
  Flyeye: 'flyeye',
} as const
export type TransMethod = typeof transMethods[keyof typeof transMethods]

export type TransState = {
  method: TransMethod
  time: number
  option: {}
}

type SliceState = {
  fore: LayerScreenState
  back: LayerScreenState
  trans: TransState
}

let counterForUniqId = 0

export const layerSlice = createSlice({
  name: 'script',

  initialState: {
    fore: {
      base: null,
      layers: [],
      message: {
        history: [],
        current: '',
        updateType: 'set',
      },
    },
    back: {
      base: null,
      layers: [],
      message: {
        history: [],
        current: '',
        updateType: 'set',
      },
    },
    trans: {
      method: '',
      time: 0,
      option: {},
    },
  } as SliceState,

  reducers: {
    showBg(state, action: PayloadAction<(string | number)[]>) {
      const [src] = action.payload
      state.fore.base = {
        id: 'fore.base',
        src: src as string,

        alpha: 1,
        x: 0,
        y: 0,
      }
    },
    showLayer(state, action: PayloadAction<(string | number)[]>) {
      const [index, src, x, y] = action.payload

      state.fore.layers[index as number] = {
        id: `fore.layers[${index}]_${++counterForUniqId}`,
        src: src as string,

        alpha: 1,
        x: x as number,
        y: y as number,
      }
    },
    readyBg(state, action: PayloadAction<(string | number)[]>) {
      const [src] = action.payload
      state.back.base = {
        id: 'back.base',
        src: src as string,

        alpha: 1,
        x: 0,
        y: 0,
      }
    },
    readyLayer(state, action: PayloadAction<(string | number)[]>) {
      const [index, src, x, y] = action.payload

      state.back.layers[index as number] = {
        id: `back.layers[${index}]_${++counterForUniqId}`,
        src: src as string,

        alpha: 1,
        x: x as number,
        y: y as number,
      }
    },
    backlay(state) {
      state.back = cloneDeep(state.fore)
    },
    trans(state, action: PayloadAction<(string | number)[]>) {
      const [method, time] = action.payload
      if (
        Object.keys(transMethods)
          .map((s) => s.toLowerCase())
          .includes(method as string)
      ) {
        state.trans.method = method as TransMethod
        state.trans.time = time as number
      } else {
        throw new Error('invalid trans method: ' + method)
      }
    },

    moveLayer(state, action: PayloadAction<(string | number)[]>) {
      const [index, x, y] = action.payload

      if (state.fore.layers[index as number]) {
        state.fore.layers[index as number].x = x as number
        state.fore.layers[index as number].y = y as number
      }
    },
    setText(state, action: PayloadAction<string[]>) {
      const msg = state.fore.message
      msg.history.push(msg.current)
      msg.current = action.payload[0]
      msg.updateType = 'set'
    },
    appendText(state, action: PayloadAction<string[]>) {
      const msg = state.fore.message
      msg.current += action.payload[0]
      msg.updateType = 'append'
    },
  },
})

export const {
  showBg,
  showLayer,
  moveLayer,
  setText,
  appendText,
} = layerSlice.actions

export default layerSlice.reducer
