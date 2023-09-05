import {FC, PropsWithChildren} from 'react'
import {useSelector} from 'react-redux'
import {isAuthenticatedSelector} from '../../store/features/auth/authSlice.ts'
// @ts-ignore
import NotAuth from '../../pages/notAuth/NotAuth.jsx'

const AuthPageGuard: FC<PropsWithChildren> = ({children}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector)

  if(!isAuthenticated){
    return <NotAuth />
  }

  return (
      <>
        {children}
      </>
  )
}

export default AuthPageGuard
