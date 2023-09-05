import {AxiosResponse} from 'axios'
import {apiWithAuthAndErrorMessaging} from './api.ts'
import {AddProjectPayload, AddTagToProjectPayload, GetProjectsResponse} from '../store/types/project.ts'
import {IProject} from '../models/IProject.ts'

export const getProjects = async (): Promise<AxiosResponse<GetProjectsResponse>> => {
  return await apiWithAuthAndErrorMessaging.get(
      '/projects/project/',
  )
}

export const getProjectColumns = async (id: string): Promise<AxiosResponse<GetProjectsResponse>> => {
  console.log(id)
  return await apiWithAuthAndErrorMessaging.get(
      '/tasks/column/'
  )
}

export const addProject = async ({name, description, deadline}: AddProjectPayload): Promise<AxiosResponse<IProject>> => {
  return await apiWithAuthAndErrorMessaging.post(
      '/projects/project/',
      {name, description, deadline}
  )
}

export const addTagToProject = async ({tagId, projectId}: AddTagToProjectPayload): Promise<AxiosResponse<IProject>> => {
  return await apiWithAuthAndErrorMessaging.put(
      `/projects/change/${projectId}/do/add_tag/`,
      {tag_id: tagId}
  )
}
