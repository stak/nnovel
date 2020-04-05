import { ActionCreator, Action } from '@reduxjs/toolkit'
import { scriptSlice } from './scriptSlice'
import { waitSlice } from './waitSlice'
import { layerSlice } from './layerSlice'

export type CommandActionCreators = {
  [key: string]: ActionCreator<Action<string>>
}

export const commandActionCreators: CommandActionCreators = {
  ...scriptSlice.actions,
  ...waitSlice.actions,
  ...layerSlice.actions,
}
