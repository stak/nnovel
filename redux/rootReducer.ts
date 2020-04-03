import { combineReducers } from '@reduxjs/toolkit'

import textReducer from './textSlice'
import scriptReducer from './scriptSlice'

const rootReducer = combineReducers({
  text: textReducer,
  script: scriptReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
