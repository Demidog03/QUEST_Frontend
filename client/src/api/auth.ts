import {api, apiWithAuthAndErrorMessaging} from './api.ts'
import {AxiosResponse} from 'axios'
import {LoginPayload, LoginResponse, LoginTokenPayload} from '../store/types/auth.ts'

export const refreshToken = async (refresh: string): Promise<AxiosResponse> => {
  return await api.post(
      '/token/refresh/',
      refresh
  )
}

export const loginUser = async ({username, password}: LoginPayload): Promise<AxiosResponse<LoginResponse>> => {
  return await api.post(
      '/login_by_email/',
      {username, password}
  )
}

export const loginTokenUser = async ({accessToken}: LoginTokenPayload): Promise<AxiosResponse<LoginResponse>> => {
  return await api.post(
      '/login_by_email/',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
  )
}

export const getLevel = async ({token} : {token: string}): Promise<AxiosResponse> => {
  return await apiWithAuthAndErrorMessaging.get(
      '/users/person/get_profile/',{
        data: {
          token
        }
      }
  )
}
