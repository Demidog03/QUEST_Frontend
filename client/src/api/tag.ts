import {AxiosResponse} from 'axios'
import {apiWithAuthAndErrorMessaging} from './api.ts'

export const getTags = async (): Promise<AxiosResponse> => {
  return await apiWithAuthAndErrorMessaging.get(
      '/tasks/tag/',
  )
}
