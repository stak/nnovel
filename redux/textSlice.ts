import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SliceState = {
  history: string[]
  current: string
  updateType: 'set' | 'append'
}

export const textSlice = createSlice({
  name: 'text',

  initialState: {
    history: [],
    current: '初期状態',
    updateType: 'set',
  } as SliceState,

  reducers: {
    setText(state, action: PayloadAction<string[]>) {
      state.history.push(state.current)
      state.current = action.payload[0]
      state.updateType = 'set'
    },
    appendText(state, action: PayloadAction<string[]>) {
      state.current += action.payload[0]
      state.updateType = 'append'
    },
  },
})

export const { setText, appendText } = textSlice.actions

export default textSlice.reducer
