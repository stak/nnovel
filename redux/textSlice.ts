import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SliceState = {
  history: string[]
  current: string
}

export const textSlice = createSlice({
  name: 'text',

  initialState: {
    history: [],
    current: '',
  } as SliceState,

  reducers: {
    next(state, action: PayloadAction<string>) {
      state.history.push(state.current)
      state.current = action.payload
    },
    append(state, action: PayloadAction<string>) {
      state.current += action.payload
    },
  },
})

export const { next, append } = textSlice.actions

export default textSlice.reducer
