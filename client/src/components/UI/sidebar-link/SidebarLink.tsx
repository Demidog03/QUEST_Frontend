import {FC} from 'react';
import classes from './sidebar-link.module.scss';
import { Link, useLocation } from 'react-router-dom';
import {ISidebarLink} from '../../../types.ts'

interface SidebarLinkProps {
    link: ISidebarLink
    index: number
}

const SidebarLink: FC<SidebarLinkProps> = ({link, index}) => {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <Link
            className={`${classes['side-link']} ${link.path === currentPath ? classes['active'] : ''} ${classes['animated-background']}`}
            key={index}
            to={link.path}
        >
            {link.path === currentPath ? (
                <img src={link.icon} alt={link.name} className={classes['side-icon']} />
            ) : (
                <img src={link.icon} alt={link.name} className={classes['side-icon']} />
            )}
            <span className={classes['side-link-name']}>{link.name}</span>
        </Link>
    );
}
export default SidebarLink;
