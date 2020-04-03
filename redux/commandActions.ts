import { textSlice } from './textSlice'
import { scriptSlice } from './scriptSlice'
import { ActionCreator } from '@reduxjs/toolkit'

export type CommandActions = {
  [key: string]: ActionCreator<any>
}

export const commandActions: CommandActions = {
  ...textSlice.actions,
  ...scriptSlice.actions,
}
