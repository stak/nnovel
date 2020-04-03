import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Enum
const waitType = {
  None: 'none',
  Click: 'click',
  Time: 'time',
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
  },
})

export const { waitClick } = waitSlice.actions

export default waitSlice.reducer
