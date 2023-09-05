import {createSlice, PayloadAction, createAction} from "@reduxjs/toolkit";
import {RootState} from '../../index.ts'
import {
  AddProjectPayload, AddTagToProjectPayload,
  GetProjectColumnsSuccessPayload,
  GetProjectsSuccessPayload,
  ProjectsState
} from '../../types/project.ts'
import {IColumn, IProject} from '../../../models/IProject.ts'

const initialState: ProjectsState =  {
  pending: false,
  projects: [],
  columns: []
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    getProjects: (state) => {
      state.pending = true
    },
    getProjectsSuccess: (state, action: PayloadAction<GetProjectsSuccessPayload> ) => {
      state.pending = false
      state.projects = action.payload.results
    },
    getProjectColumns: (state) => {
      state.pending = true
    },
    getProjectColumnsSuccess: (state, action: PayloadAction<GetProjectColumnsSuccessPayload> ) => {
      state.pending = false
      state.columns = action.payload.results
    },
    addProject: (state) => {
      state.pending = true
    },
    addProjectSuccess: (state, action: PayloadAction<IProject>) => {
      state.pending = false
      state.projects = [...state.projects, action.payload]
    },
    addTagToProject: (state) => {
      state.pending = true
    },
    addTagToProjectSuccess: (state) => {
      state.pending = false
    },
  },
  extraReducers: {

  }
})

export const getProjects = createAction('project/getProjects')
export const getProjectsSuccess = createAction<GetProjectsSuccessPayload>('project/getProjectsSuccess')
export const getProjectColumns = createAction<string>('project/getProjectColumns')
export const getProjectColumnsSuccess = createAction<GetProjectColumnsSuccessPayload>('project/getProjectColumnsSuccess')
export const addProject = createAction<AddProjectPayload>('project/addProject')
export const addProjectSuccess = createAction<IProject>('project/addProjectSuccess')
export const addTagToProject = createAction<AddTagToProjectPayload>('project/addTagToProject')
export const addTagToProjectSuccess = createAction<IProject>('project/addTagToProjectSuccess')



export const projectsSelector = ((state: RootState): IProject[] | null => state.project.projects)
export const projectsPendingSelector = ((state: RootState): boolean => state.project.pending)
export const projectColumnsSelector = ((state: RootState): IColumn[] => {
  const columnsCopy = [...state.project.columns];
  return columnsCopy.sort((a, b) => a.id - b.id);
})

export default projectSlice.reducer
