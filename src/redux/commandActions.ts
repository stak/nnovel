import { ActionCreator, Action } from '@reduxjs/toolkit'
import { scriptSlice } from './scriptSlice'
import { gameSlice } from './gameSlice'

export type CommandActionCreators = {
  [key: string]: ActionCreator<Action<string>>
}

export const commandActionCreators: CommandActionCreators = {
  ...scriptSlice.actions,
  ...gameSlice.actions,
}
