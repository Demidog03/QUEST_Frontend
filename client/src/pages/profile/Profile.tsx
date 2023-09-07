import classes from './profile.module.scss'
import ProgressBar from 'components/UI/progress-bar/ProgressBar.jsx';
import {useDispatch, useSelector} from 'react-redux'
import {authLevelSelector, authUserSelector, authXpSelector, getLevel} from '../../store/features/auth/authSlice.ts'
import {useEffect} from 'react'

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector(authUserSelector)
    const level = useSelector(authLevelSelector)
    const xp = useSelector(authXpSelector)
    const solved = 110;

  useEffect(() => {
    dispatch(getLevel({token: user.accessToken}))
  }, [])

  return(
        <div className={classes.container}>
            <img src={`${import.meta.env.VITE_BACKEND_URL ?? ''}` + user?.user.profile_image} className={classes['profile-picture']} />
            <span className={classes.name}>{user?.user.username}</span>
            <span className={classes.position}>{user?.position.code}</span>
            <div className={classes.progress}>
                <div className={classes['level-progress']}>
                    <span className={classes.level}>{level}</span>
                    <span className={classes['level-word']}>Level</span>
                    <ProgressBar width={300} percentage={xp}/>
                </div>
                <div className={classes['solved-tasks']}>
                    <span className={classes['solved-tasks-amount']}>{solved}</span>
                    <span className={classes['solved-word']}>Solved</span>
                </div>
            </div>
        </div>
    );
}

export default Profile;
