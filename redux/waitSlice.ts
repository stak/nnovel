import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Enum
const waitType = {
  None: 'none',
  Click: 'click',
  Time: 'time',
  Text: 'text',
} as const
type WaitType = typeof waitType[keyof typeof waitType]

type SliceState = {
  waitType: WaitType
  time: number
}

export const waitSlice = createSlice({
  name: 'wait',

  initialState: {
    waitType: waitType.None,
    time: 0,
  } as SliceState,

  reducers: {
    waitClick(state) {
      state.waitType = waitType.Click
    },
    waitText(state) {
      state.waitType = waitType.Text
    },
    waitTime(state, action: PayloadAction<number[]>) {
      state.time = action.payload[0]
      state.waitType = waitType.Time
    },
    waitDone(state) {
      state.waitType = waitType.None
    },
  },
})

export const { waitClick, waitText, waitTime, waitDone } = waitSlice.actions

export default waitSlice.reducer
