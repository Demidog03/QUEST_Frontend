import {FC} from 'react'
import {Typography, Link, Stack} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {MdNavigateNext} from 'react-icons/md'

const Breadcrumbs: FC<{title: string}> = ({title}) => {
  const navigate = useNavigate()

  return (
      <div>
        <Stack spacing={2} direction="row" alignItems="center" sx={{pb: 3, pl: 2}}>
          <Link underline="hover" component="button" onClick={() => navigate('/projects')} sx={{fontWeight: 700, color: 'black', fontSize: '1.2rem'}}>
            Projects
          </Link>
          <MdNavigateNext/>
          <Typography sx={{textDecoration: 'underline', color: '#82808F', fontSize: '1.4rem'}} >{title}</Typography>
        </Stack>
      </div>
  )
}

export default Breadcrumbs
