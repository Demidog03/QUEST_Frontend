import {call, put, takeLeading} from 'redux-saga/effects'
import {AxiosResponse} from 'axios'
import {GetTasksResponse, TaskActionTypes, UpdateTaskColumnAction} from '../../types/task.ts'
import {getTasks as getTasksApi, updateTaskColumn as updateTaskColumnApi, addTask as addTaskApi} from '../../../api/task.ts'
import {addTaskSuccess, getTasksSuccess, updateTaskColumnSuccess, addTask as addTaskAction} from './taskSlice.ts'
import {ITask} from '../../../models/ITask.ts'

export function* getTasks(action: any) {
  try {
    // @ts-ignore TODO
    const response: AxiosResponse<GetTasksResponse> = yield call(getTasksApi, action.payload)
    if(response.data){
      yield put(getTasksSuccess(response.data));
    }
  } catch {}
}

export function* updateTaskColumn(action: UpdateTaskColumnAction) {
  try {
    const response: AxiosResponse<ITask> = yield call(updateTaskColumnApi, {...action.payload})
    if(response.data){
      yield put(updateTaskColumnSuccess(response.data));
    }
  } catch {}
}
export function* addTask(action: any) {
  try {
    const response: AxiosResponse<ITask> = yield call(addTaskApi, action.payload)
    if(response.data){
      yield put(addTaskSuccess(response.data));
    }
  } catch {}
}

export function* taskSaga(){
  yield takeLeading(TaskActionTypes.GET_TASKS, getTasks)
  yield takeLeading(TaskActionTypes.UPDATE_TASK_COLUMN, updateTaskColumn)
  yield takeLeading(addTaskAction.type, addTask)
}
