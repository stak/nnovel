import { combineReducers } from '@reduxjs/toolkit'

import textReducer from './textSlice'
import scriptReducer from './scriptSlice'
import waitReducer from './waitSlice'

const rootReducer = combineReducers({
  text: textReducer,
  script: scriptReducer,
  wait: waitReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
