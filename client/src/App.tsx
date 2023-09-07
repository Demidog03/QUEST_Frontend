import 'react-toastify/dist/ReactToastify.css';
import cl from './App.module.scss'
import {useRoutes} from 'react-router-dom'
import {useEffect} from "react";
import Sidebar from "./components/sidebar/Sidebar";

import Notes from "components/notes/Notes.jsx";
import {
  authUserSelector,
  loginToken
} from './store/features/auth/authSlice.ts'
import {useDispatch, useSelector} from 'react-redux'
import { router } from './routes'
import { ToastContainer } from 'react-toastify'
import { getProjects } from './store/features/project/projectSlice.ts'
import {getNotes} from './store/features/notes/notesSlice.ts'


export default function App() {
  const dispatch = useDispatch()
  const user = useSelector(authUserSelector)
  const content = useRoutes(router)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if(accessToken){
      dispatch(loginToken({accessToken}))
    }
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(getProjects())
      dispatch(getNotes())
    }
  }, [user])

  return (
      <>
        <ToastContainer />
        <div className={cl.mainContainer}>
          {user && <Sidebar/>}
          { content }
          {user && <Notes/>}
        </div>
      </>
  )
}
