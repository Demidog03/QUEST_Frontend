import {INote} from '../../types.ts'

export interface NotesState {
  pending: boolean
  notes: INote[]
}

export interface GetNotesSuccessPayload {
  next: boolean
  previous: boolean
  count: number
  pageCount: number
  results: INote[]
}
export enum NotesActionTypes {
  GET_NOTES = 'note/getNotes',
  GET_NOTES_SUCCESS = 'note/getNotesSuccess'
}

export interface AddNoteSuccessPayload {
  title: string
  text: string
  is_favorite: boolean
}
