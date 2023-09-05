import {FC} from 'react'
import { Link } from 'react-router-dom';
import classes from './profile.module.scss';
import {BiSolidExit} from 'react-icons/bi'
import {useDispatch} from 'react-redux'
import {logout} from '../../../store/features/auth/authSlice.ts'

interface ProfileProps{
  name: string
  src: string | undefined
}

const Profile: FC<ProfileProps> = ({name, src}) => {
  const dispatch = useDispatch()
    return (
        <Link to={'/profile'} className={classes.profile}>
            <div className={classes.profileInfo}>
                <img src={src} className={classes.pfp} />
                <span className={classes.name}>{name}</span>
            </div>
          <BiSolidExit onClick={() => dispatch(logout())} style={{color: 'black', fontSize: '1.4rem'}}/>
        </Link>
    );
}
export default Profile;
