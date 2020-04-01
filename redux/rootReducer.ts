import { combineReducers } from '@reduxjs/toolkit'

import textReducer from './textSlice'

const rootReducer = combineReducers({
  text: textReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
