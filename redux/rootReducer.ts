import { combineReducers } from '@reduxjs/toolkit'

import scriptReducer from './scriptSlice'
import waitReducer from './waitSlice'
import layerReducer from './layerSlice'

const rootReducer = combineReducers({
  script: scriptReducer,
  wait: waitReducer,
  layer: layerReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
