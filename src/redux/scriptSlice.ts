import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Command = {
  name: string
  args: (string | number)[]
}

type SliceState = {
  commands: Command[]
  pos: number
  eos: boolean
}

export const scriptSlice = createSlice({
  name: 'script',

  initialState: {
    commands: [],
    pos: 0,
    eos: false,
  } as SliceState,

  reducers: {
    startScript(state, action: PayloadAction<Array<Command>>) {
      state.commands = action.payload
      state.pos = 0
      state.eos = false
    },
    execScript(state) {
      if (state.pos < state.commands.length) {
        state.pos += 1
      } else {
        state.eos = true
      }
    },
  },
})

export const { startScript, execScript } = scriptSlice.actions

export default scriptSlice.reducer
