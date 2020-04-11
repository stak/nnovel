import { combineReducers } from '@reduxjs/toolkit'

import scriptReducer from './scriptSlice'
import gameReducer from './gameSlice'

const rootReducer = combineReducers({
  script: scriptReducer,
  game: gameReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
