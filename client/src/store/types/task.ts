import {ITask} from '../../models/ITask.ts'

export enum TaskActionTypes {
  GET_TASKS = "task/getTasks",
  UPDATE_TASK_COLUMN = "task/updateTaskColumn"
}

export interface TasksState {
  tasks: ITask[]
  pending: boolean
}

export interface GetTasksResponse{
  next: boolean
  previous: boolean
  count: number
  pageCount: number
  results: ITask[]
}
export interface GetTasksSuccessPayload {
  next: boolean
  previous: boolean
  count: number
  pageCount: number
  results: ITask[]
}

export interface UpdateTaskColumnAction {
  type: TaskActionTypes.UPDATE_TASK_COLUMN,
  payload: {
    taskId: number
    columnId: number
  }
}

export interface AddTaskPayload {
  name: string
  description: string
  end_date: string
  deadline: string
  column: string
  project: number
}
