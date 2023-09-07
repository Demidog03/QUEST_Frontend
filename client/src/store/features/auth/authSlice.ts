import {createSlice, PayloadAction, createAction} from "@reduxjs/toolkit";
import {
  AuthState,
  LoginPayload,
  LoginSuccessPayload,
  LoginTokenPayload,
  TokenPayload
} from '../../types/auth.ts'
import {RootState} from '../../index.ts'
import {IUser} from '../../../models/IUser.ts'

const initialState: AuthState =  {
  pending: false,
  error: null,
  user: null,
  accessToken: "",
  refreshToken: "",
  isAuthenticated: false,
  level: 0,
  xp: 0
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.pending = true
    },
    loginSuccess: (state, action: PayloadAction<LoginSuccessPayload> ) => {
      state.pending = false
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true
    },
    loginToken: (state) => {
      state.pending = true;
    },
    setToken: (state, action: PayloadAction<TokenPayload>) => {
      if(state.accessToken && state.refreshToken){
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      }
    },
    logout: (state) => {
      state.refreshToken = ""
      state.accessToken = ""
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    },
    getLevel: (state) => {
      state.pending = true;
    },
    getLevelSuccess: (state, action: PayloadAction<{xp: number, level: number}>) => {
      state.pending = false;
      state.xp = action.payload.xp
      state.level = action.payload.level
    },
  },
  extraReducers: {

  }
})

export const login = createAction<LoginPayload>('auth/login')
export const loginSuccess = createAction<LoginSuccessPayload>('auth/loginSuccess')
export const loginToken = createAction<LoginTokenPayload>('auth/loginToken')
export const setToken = createAction<TokenPayload>('auth/setToken')
export const logout = createAction('auth/logout')
export const getLevel = createAction<{token: string}>('auth/getLevel')
export const getLevelSuccess = createAction<{xp: number, level: number}>('auth/getLevelSuccess')

export const authUserSelector = ((state: RootState): IUser | null => state.auth.user)
export const authLevelSelector = ((state: RootState): number | null => state.auth.level)
export const authXpSelector = ((state: RootState): number | null => state.auth.xp)
export const authPendingSelector = ((state: RootState): boolean => state.auth.pending)
export const authAccessTokenSelector = ((state: RootState): string => state.auth.accessToken)
export const authRefreshTokenSelector = ((state: RootState): string => state.auth.refreshToken)
export const isAuthenticatedSelector = ((state: RootState): boolean => state.auth.isAuthenticated)

export default authSlice.reducer
