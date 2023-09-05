import { call, put, takeLeading } from 'redux-saga/effects';
import { getNotes as getNotesApi, addNote as addNoteApi } from '../../../api/notes'
import {addNote, addNoteSuccess, getNotesSuccess} from './notesSlice.ts'
import {NotesActionTypes} from '../../types/note.ts'

export function* getNotesSaga() {
  try {
    const { data } = yield call(getNotesApi)
    yield put(getNotesSuccess(data));
  } catch {}
}

export function* addNoteSaga(action: any) {
  try {
    const { data } = yield call(addNoteApi, action.payload)
    yield put(addNoteSuccess(data));
  } catch {}
}


function* notesSaga() {
  yield takeLeading(NotesActionTypes.GET_NOTES, getNotesSaga); // Use loginSaga directly
  yield takeLeading(addNote.type, function* (action) {
    yield call(addNoteSaga, action)
    yield call(getNotesSaga)
  });
}

export default notesSaga;
