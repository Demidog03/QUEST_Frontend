import {type ComponentType, lazy, Suspense} from 'react'
import Loading from 'components/UI/loading/Loading.jsx'
import {RouteObject} from 'react-router-dom'
import AuthPageGuard from 'components/guards/AuthPageGuard.tsx'
import {GuestGuard} from 'components/guards/GuestGuard.tsx'

const Loadable = (Component: ComponentType) => (props: any) => (
    <Suspense fallback={<Loading loading={true}/>}>
      <Component {...props} />
    </Suspense>
)

const AuthPage = Loadable(lazy(async() => await import('./pages/auth/AuthPage')))
const ProjectsPage = Loadable(lazy(async() => await import('./pages/projects/ProjectsPage')))
const NotFoundPage = Loadable(lazy(async() => await import('./pages/notFound/NotFound404')))
const ProfilePage = Loadable(lazy(async() => await import('./pages/profile/Profile')))
const KanbanPage = Loadable(lazy(async() => await import('./pages/kanban/Kanban')))

export const router: RouteObject[] = [
  {
    path: 'class',
    element: (
      <AuthPageGuard>
        <ProjectsPage/>
      </AuthPageGuard>
    )
  },
  {
    path: 'login',
    element: (
        <GuestGuard>
          <AuthPage/>
        </GuestGuard>
    )
  },
  {
    path: 'register',
    element: (
        <GuestGuard>
          <AuthPage/>
        </GuestGuard>
    )
  },
  {
    path: 'profile',
    element: (
        <AuthPageGuard>
          <ProfilePage/>
        </AuthPageGuard>
    )
  },
  {
    path: 'tasks',
    children: [
        {
          path: ':id',
          element: (
              <AuthPageGuard>
                <KanbanPage/>
              </AuthPageGuard>
          )
        },
      {
        path: '',
        element: (
            <AuthPageGuard>
              <NotFoundPage/>
            </AuthPageGuard>
        )
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]
