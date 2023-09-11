import {call, put, takeLeading} from 'redux-saga/effects'
import {AxiosResponse} from 'axios'
import {GetTasksResponse, TaskActionTypes, UpdateTaskColumnAction, UpdateTaskPayload} from '../../types/task.ts'
import {getTasks as getTasksApi, updateTaskColumn as updateTaskColumnApi, addTask as addTaskApi, getTask as getTaskApi, updateTask as updateTaskApi} from '../../../api/task.ts'
import {getLevel as getLevelApi} from '../../../api/auth.ts'
import {
  addTaskSuccess,
  getTasksSuccess,
  updateTaskColumnSuccess,
  addTask as addTaskAction,
  getTask as getTaskAction,
  updateTask as updateTaskAction,
  getTaskSuccess,
  updateTaskSuccess
} from './taskSlice.ts'
import {ITask} from '../../../models/ITask.ts'
import store from '../../index.ts'
import {authAccessTokenSelector, authXpSelector, getLevel} from '../auth/authSlice.ts'
import {toast} from 'react-toastify'
import {PayloadAction} from '@reduxjs/toolkit'

export function* getTasks(action: any) {
  try {
    // @ts-ignore TODO
    const response: AxiosResponse<GetTasksResponse> = yield call(getTasksApi, action.payload)
    if(response.data){
      yield put(getTasksSuccess(response.data));
    }
  } catch {}
}

export function* getTask(action: PayloadAction<{ taskId: number }>) {
  try {
    const response: AxiosResponse<ITask> = yield call(getTaskApi, action.payload)
    if(response.data){
      yield put(getTaskSuccess(response.data));
    }
  } catch {}
}

export function* updateTaskColumn(action: any) {
  try {
    const xp = authXpSelector(store.getState())
    const token =  authAccessTokenSelector(store.getState())
    const response: AxiosResponse<ITask> = yield call(updateTaskColumnApi, {...action.payload})
    if(response.data){
      yield put(updateTaskColumnSuccess(response.data));
      const levelResponse = yield call(getLevelApi, {token})
      const xpDiff = levelResponse.data.xp - xp

      if(xpDiff > 0){
        toast.success(`Gained ${xpDiff} XP!!! 🫡`, {
          hideProgressBar: true
        })
      }
      else if (xpDiff < 0){
        toast(`Lost ${-xpDiff} XP 😥`, {
          hideProgressBar: true
        })
      }

      yield put(getLevel({ token }));
    }
  } catch {}
}
export function* addTask(action: any) {
  try {
    const response: AxiosResponse<ITask> = yield call(addTaskApi, action.payload)
    if(response.data){
      yield put(addTaskSuccess(response.data));
      yield getTasks(action.payload.project)
    }
  } catch {}
}

export function* updateTask(action: PayloadAction<UpdateTaskPayload>) {
  try {
    const response: AxiosResponse<ITask> = yield call(updateTaskApi, action.payload)
    if(response.data){
      yield put(updateTaskSuccess(response.data));
    }
  } catch {}
}

export function* taskSaga(){
  yield takeLeading(TaskActionTypes.GET_TASKS, getTasks)
  yield takeLeading(TaskActionTypes.UPDATE_TASK_COLUMN, updateTaskColumn)
  yield takeLeading(addTaskAction.type, addTask)
  yield takeLeading(getTaskAction.type, getTask)
  yield takeLeading(updateTaskAction.type, updateTask)
}
