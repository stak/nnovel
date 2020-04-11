import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import rootReducer from './rootReducer'

export const setupStore = (): EnhancedStore => {
  const middlewares = [...getDefaultMiddleware()]

  // only development
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  return configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: true,
  })
}
