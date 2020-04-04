import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type LayerState = {
  id: string
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

let counterForUniqId = 0

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
    moveLayer(state, action: PayloadAction<(string | number)[]>) {
      const [index, x, y] = action.payload

      if (state.fore.layers[index as number]) {
        state.fore.layers[index as number].x = x as number
        state.fore.layers[index as number].y = y as number
      }
    },
  },
})

export const { showBg, showLayer, moveLayer } = layerSlice.actions

export default layerSlice.reducer
