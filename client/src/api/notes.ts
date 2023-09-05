import {AxiosResponse} from 'axios'
import {apiWithAuthAndErrorMessaging} from './api.ts'
import {AddNoteSuccessPayload, GetNotesSuccessPayload} from '../store/types/note.ts'

export const getNotes = async (): Promise<AxiosResponse<GetNotesSuccessPayload>> => {
  return await apiWithAuthAndErrorMessaging.get(
      '/utils/person_notes/'
  )
}
export const addNote = async (data: AddNoteSuccessPayload): Promise<AxiosResponse<AddNoteSuccessPayload>> => {
  return await apiWithAuthAndErrorMessaging.post(
      '/utils/person_notes/', {
        ...data
      }
  )
}
