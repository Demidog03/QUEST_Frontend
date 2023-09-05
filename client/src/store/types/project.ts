import {IColumn, IProject} from '../../models/IProject.ts'

export enum ProjectActionTypes {
  GET_PROJECTS = "project/getProjects",
  GET_PROJECT_COLUMNS = "project/getProjectColumns"
}

export interface ProjectsState {
  projects: IProject[]
  pending: boolean
  columns: IColumn[]
}

export interface GetProjectsResponse{
  next: boolean
  previous: boolean
  count: number
  pageCount: number
  results: IProject[]
}

export interface GetProjectsSuccessPayload {
  next: boolean
  previous: boolean
  count: number
  pageCount: number
  results: IProject[]
}
export interface GetProjectColumnsSuccessPayload {
  next: boolean
  previous: boolean
  count: number
  pageCount: number
  results: IColumn[]
}

export interface GetProjectColumnsAction {
  type: ProjectActionTypes.GET_PROJECT_COLUMNS,
  payload: string
}

export interface AddProjectPayload {
  name: string
  description: string
  deadline: string
}

export interface AddTagToProjectPayload {
  tagId: number
  projectId: number
}
