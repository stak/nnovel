import { createSlice } from '@reduxjs/toolkit'

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
}

export const waitSlice = createSlice({
  name: 'wait',

  initialState: {
    waitType: waitType.None,
  } as SliceState,

  reducers: {
    waitClick(state) {
      state.waitType = waitType.Click
    },
    waitText(state) {
      state.waitType = waitType.Text
    },
    waitDone(state) {
      state.waitType = waitType.None
    },
  },
})

export const { waitClick, waitText, waitDone } = waitSlice.actions

export default waitSlice.reducer
