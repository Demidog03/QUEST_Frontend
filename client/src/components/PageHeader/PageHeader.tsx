import {FC} from 'react'
import {useLocation} from 'react-router-dom'
import {BsClockHistory} from 'react-icons/bs'
import cl from "./PageHeader.module.scss"

export const PageHeader: FC = () => {
  const {pathname} = useLocation()

  if(pathname==="/class"){
    return <div className={cl.projects}><BsClockHistory/><h2>Latest Classes</h2></div>
  }

  return (
      <div>

      </div>
  )
}

