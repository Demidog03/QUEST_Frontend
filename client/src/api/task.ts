import {AxiosResponse} from 'axios'
import {apiWithAuthAndErrorMessaging} from './api.ts'
import {AddTaskPayload, GetTasksResponse} from '../store/types/task.ts'
import {ITask} from '../models/ITask.ts'

export const getTasks = async (projectId: number): Promise<AxiosResponse<GetTasksResponse>> => {
  return await apiWithAuthAndErrorMessaging.get(
      '/tasks/task/',
      {
        params: {
          project: projectId
        }
      }
  )
}

export const updateTaskColumn = async ({columnId, taskId}: {columnId: number, taskId: number}): Promise<AxiosResponse<ITask>> => {
  return await apiWithAuthAndErrorMessaging.put(
      `/tasks/task_tag/${taskId}/do/change_task_column/`,{
        column: columnId
      }
  )
}
export const addTask = async (data: AddTaskPayload): Promise<AxiosResponse<ITask>> => {
  return await apiWithAuthAndErrorMessaging.post(
      `/tasks/task/`,{
        ...data
      }
  )
}


