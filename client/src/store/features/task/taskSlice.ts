import {createSlice, PayloadAction, createAction} from "@reduxjs/toolkit";
import {RootState} from '../../index.ts'
import {ITask} from '../../../models/ITask.ts'
import {AddTaskPayload, GetTasksSuccessPayload, TasksState, UpdateTaskPayload} from '../../types/task.ts'

const initialState: TasksState =  {
  pending: false,
  tasks: [],
  task: null
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getTasks: (state) => {
      state.pending = true
    },
    getTasksSuccess: (state, action: PayloadAction<GetTasksSuccessPayload> ) => {
      state.pending = false
      state.tasks = action.payload.results
    },
    getTask: (state) => {
      state.pending = true
    },
    getTaskSuccess: (state, action: PayloadAction<ITask> ) => {
      state.pending = false
      state.task = action.payload
    },
    updateTask: (state) => {
      state.pending = true
    },
    updateTaskSuccess: (state, action: PayloadAction<ITask> ) => {
      state.pending = false
      state.tasks = [...state.tasks.filter(task => task.id !== action.payload.id), action.payload]
    },
    updateTaskColumn: (state) => {
      state.pending = true
    },
    updateTaskColumnSuccess: (state, action: PayloadAction<ITask> ) => {
      state.pending = false
      state.tasks = [...state.tasks.filter(task => task.id !== action.payload.id), action.payload]
    },
    addTask: (state) => {
      state.pending = true
    },
    addTaskSuccess: (state, action: PayloadAction<ITask>) => {
      state.pending = false
      state.tasks = [...state.tasks, action.payload]
    },
  },
  extraReducers: {

  }
})

export const getTasks = createAction<number>('task/getTasks')
export const getTasksSuccess = createAction<GetTasksSuccessPayload>('task/getTasksSuccess')
export const getTask = createAction<{ taskId: number }>('task/getTask')
export const getTaskSuccess = createAction<ITask>('task/getTaskSuccess')
export const updateTask = createAction<UpdateTaskPayload>('task/updateTask')
export const updateTaskSuccess = createAction<ITask>('task/updateTaskSuccess')
export const updateTaskColumn = createAction<{taskId: number, columnId: number}>('task/updateTaskColumn')
export const updateTaskColumnSuccess = createAction<ITask>('task/updateTaskColumnSuccess')
export const addTask = createAction<AddTaskPayload>('task/addTask')
export const addTaskSuccess = createAction<ITask>('task/addTask')
export const TasksSelector = ((state: RootState): ITask[] | null => state.task.tasks)
export const taskSelector = ((state: RootState): ITask | null => state.task.task)
export const tasksPendingSelector = ((state: RootState): boolean => state.task.pending)

export default taskSlice.reducer
