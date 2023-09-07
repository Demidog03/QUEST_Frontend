import {IUser} from '../../models/IUser.ts'

export interface AuthState {
  pending: boolean
  user: IUser | null
  error: string | null
  accessToken: string
  refreshToken: string
  isAuthenticated: boolean
  level: number
  xp: number
}

export enum AuthActionTypes {
  LOGIN = "auth/login",
  LOGIN_TOKEN = "auth/loginToken"
}

export interface LoginResponse{
  user_data: IUser
}

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginSuccessPayload {
  user: IUser
  accessToken: string
  refreshToken: string
}

export interface TokenPayload {
  accessToken: string
  refreshToken: string
}

export interface LoginTokenPayload {
  accessToken: string | null
}

export interface LoginAction {
  type: AuthActionTypes.LOGIN,
  payload: LoginPayload
}

export interface LoginTokenAction {
  type: AuthActionTypes.LOGIN_TOKEN,
  payload: LoginTokenPayload
}

