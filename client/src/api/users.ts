import {AxiosResponse} from 'axios'
import {apiWithAuthAndErrorMessaging} from './api.ts'

export const getUsers = async (): Promise<AxiosResponse<{id: number, username: string}>> => {
  return await apiWithAuthAndErrorMessaging.get(
      '/users/person/get_all_users',
  )
}
