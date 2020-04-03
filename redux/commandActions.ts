import { ActionCreator } from '@reduxjs/toolkit'
import { textSlice } from './textSlice'
import { scriptSlice } from './scriptSlice'
import { waitSlice } from './waitSlice'

export type CommandActions = {
  [key: string]: ActionCreator<any>
}

export const commandActions: CommandActions = {
  ...textSlice.actions,
  ...scriptSlice.actions,
  ...waitSlice.actions,
}
