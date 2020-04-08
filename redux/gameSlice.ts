import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'

const transList = ['crossfade', 'slice', 'flyeye', 'blur']

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

export type LayerSetState = {
  base: LayerState | null
  layers: LayerState[]
  message: MessageLayerState
}

export type TransState = {
  method: string
  time: number
  options: (string | number)[]
}

type ScreenState = {
  fore: LayerSetState
  back: LayerSetState
  trans: TransState
}

// Enum
const waitTypes = {
  None: 'none',
  Click: 'click',
  Time: 'time',
  Text: 'text',
  Trans: 'trans',
} as const
type WaitType = typeof waitTypes[keyof typeof waitTypes]

type WaitState = {
  waitClick: boolean
  waitTime: boolean
  waitText: boolean
  waitTrans: boolean
  waitNone: boolean
  time: number
}

type GameState = {
  screen: ScreenState
  wait: WaitState
}

let counterForUniqId = 0

const gameInitialState: GameState = {
  screen: {
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
      options: [],
    },
  },
  wait: {
    waitNone: false,
    waitClick: false,
    waitTime: false,
    waitText: false,
    waitTrans: false,
    time: 0,
  },
}

export const gameSlice = createSlice({
  name: 'game',

  initialState: gameInitialState,

  reducers: {
    gameInit(state) {
      state.screen = cloneDeep(gameInitialState.screen)
      state.wait = cloneDeep(gameInitialState.wait)
    },
    showBg(state, action: PayloadAction<(string | number)[]>) {
      const [src] = action.payload
      state.screen.fore.base = {
        id: 'fore.base',
        src: src as string,

        alpha: 1,
        x: 0,
        y: 0,
      }
    },
    showLayer(state, action: PayloadAction<(string | number)[]>) {
      const [index, src, x, y] = action.payload

      state.screen.fore.layers[index as number] = {
        id: `fore.layers[${index}]_${++counterForUniqId}`,
        src: src as string,

        alpha: 1,
        x: x as number,
        y: y as number,
      }
    },
    readyBg(state, action: PayloadAction<(string | number)[]>) {
      const [src] = action.payload
      state.screen.back.base = {
        id: 'back.base',
        src: src as string,

        alpha: 1,
        x: 0,
        y: 0,
      }
    },
    readyLayer(state, action: PayloadAction<(string | number)[]>) {
      const [index, src, x, y] = action.payload

      state.screen.back.layers[index as number] = {
        id: `back.layers[${index}]_${++counterForUniqId}`,
        src: src as string,

        alpha: 1,
        x: x as number,
        y: y as number,
      }
    },
    backlay(state) {
      state.screen.back = cloneDeep(state.screen.fore)
    },
    forelay(state) {
      state.screen.fore = cloneDeep(state.screen.back)
    },
    trans(state, action: PayloadAction<(string | number)[]>) {
      const [method, time, ...options] = action.payload
      if (transList.includes(method as string)) {
        state.screen.trans.method = method as string
        state.screen.trans.time = time as number
        state.screen.trans.options = options
      } else {
        throw new Error('invalid trans method: ' + method)
      }
    },
    transDone(state) {
      state.screen.fore = cloneDeep(state.screen.back)
      state.screen.trans.method = ''
    },

    moveLayer(state, action: PayloadAction<(string | number)[]>) {
      const [index, x, y] = action.payload

      if (state.screen.fore.layers[index as number]) {
        state.screen.fore.layers[index as number].x = x as number
        state.screen.fore.layers[index as number].y = y as number
      }
    },
    setText(state, action: PayloadAction<string[]>) {
      const msg = state.screen.fore.message
      msg.history.push(msg.current)
      msg.current = action.payload[0]
      msg.updateType = 'set'
    },
    appendText(state, action: PayloadAction<string[]>) {
      const msg = state.screen.fore.message
      msg.current += action.payload[0]
      msg.updateType = 'append'
    },

    waitClick(state) {
      state.wait.waitClick = true
    },
    waitText(state) {
      state.wait.waitText = true
    },
    waitTime(state, action: PayloadAction<number[]>) {
      state.wait.time = action.payload[0]
      state.wait.waitTime = true
    },
    waitTrans(state) {
      if (state.screen.trans.method !== '') {
        state.wait.waitTrans = true
      } else {
        // no transition
        state.wait.waitNone = true
      }
    },
    waitDone(state, action: PayloadAction<string[]>) {
      const [waitType] = action.payload

      if (waitType === waitTypes.Click) {
        state.wait.waitClick = false
      } else if (waitType === waitTypes.Time) {
        state.wait.waitTime = false
      } else if (waitType === waitTypes.Text) {
        state.wait.waitText = false
      } else if (waitType === waitTypes.Trans) {
        state.wait.waitTrans = false
      }
    },
  },
})

export const {
  gameInit,
  showBg,
  showLayer,
  moveLayer,
  setText,
  appendText,
  backlay,
  forelay,
  trans,
  transDone,
  waitClick,
  waitText,
  waitTime,
  waitTrans,
  waitDone,
} = gameSlice.actions

export default gameSlice.reducer
