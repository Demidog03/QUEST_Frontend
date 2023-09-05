import {call, put, takeLeading} from 'redux-saga/effects'
import {
  addProjectSuccess,
  getProjectColumnsSuccess,
  getProjectsSuccess,
  addProject as addProjectAction,
  addTagToProject as addTagToProjectAction,
  addTagToProjectSuccess
} from './projectSlice.ts'
import {
  getProjects as getProjectsApi,
  getProjectColumns as getProjectColumnsApi,
  addProject as addProjectApi,
  addTagToProject as  addTagToProjectApi
} from '../../../api/project.ts'
import {
  AddProjectPayload, AddTagToProjectPayload,
  GetProjectColumnsAction,
  GetProjectColumnsSuccessPayload,
  GetProjectsResponse,
  ProjectActionTypes
} from '../../types/project.ts'
import {AxiosResponse} from 'axios'
import {IProject} from '../../../models/IProject.ts'

export function* getProjects(): Generator<any, void, AxiosResponse<GetProjectsResponse>> {
  try {
    const response: AxiosResponse<GetProjectsResponse> = yield call(getProjectsApi)
    if(response.data){
      yield put(getProjectsSuccess(response.data));
    }
  } catch {}
}

export function* getProjectColumns(action: GetProjectColumnsAction): Generator<any, void, AxiosResponse<GetProjectColumnsSuccessPayload>> {
  try {
    const response = yield call(getProjectColumnsApi,  action.payload)
    console.log(response)
    if(response.data) {
      yield put(getProjectColumnsSuccess(response.data))
    }
  }
  catch {}
}

export function* addProject(action: any): Generator<any, void, AxiosResponse<IProject>> {
  const {name, description, deadline} = action.payload
  try {
    const response: AxiosResponse<IProject> = yield call(addProjectApi, {name, description, deadline} as AddProjectPayload)
    if(response.data){
      yield put(addProjectSuccess(response.data));
    }
  } catch {}
}

export function* addTagToProject(action: any): Generator<any, void, AxiosResponse<IProject>> {
  try {
    const response = yield call(addTagToProjectApi, action.payload as AddTagToProjectPayload)
    if(response.data) {
      yield put(addTagToProjectSuccess(response.data))
    }
  }
  catch {}
}


export function* projectSaga(){
  yield takeLeading(ProjectActionTypes.GET_PROJECTS, getProjects)
  yield takeLeading(ProjectActionTypes.GET_PROJECT_COLUMNS, getProjectColumns)
  yield takeLeading(addProjectAction.type, addProject)
  yield takeLeading(addTagToProjectAction.type, function* (action) {
    yield call(addTagToProject, action)
    yield call(getProjects)
  });
}
