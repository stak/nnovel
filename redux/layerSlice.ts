import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type LayerState = {
  src: string

  alpha: number
  x: number
  y: number
}

type SliceState = {
  fore: {
    base: LayerState | null
    layers: LayerState[]
  }
  back: {
    base: LayerState | null
    layers: LayerState[]
  }
}

export const layerSlice = createSlice({
  name: 'script',

  initialState: {
    fore: {
      base: null,
      layers: [],
    },
    back: {
      base: null,
      layers: [],
    },
  } as SliceState,

  reducers: {
    showBg(state, action: PayloadAction<(string | number)[]>) {
      const [src] = action.payload
      state.fore.base = {
        src: src as string,

        alpha: 1,
        x: 0,
        y: 0,
      }
    },
  },
})

export const { showBg } = layerSlice.actions

export default layerSlice.reducer
