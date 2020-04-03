import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SliceState = {
  history: string[]
  current: string
}

export const textSlice = createSlice({
  name: 'text',

  initialState: {
    history: [],
    current: '初期状態',
  } as SliceState,

  reducers: {
    setText(state, action: PayloadAction<Array<string>>) {
      state.history.push(state.current)
      state.current = action.payload[0]
    },
    appendText(state, action: PayloadAction<Array<string>>) {
      state.current += action.payload[0]
    },
  },
})

export const { setText, appendText } = textSlice.actions

export default textSlice.reducer
