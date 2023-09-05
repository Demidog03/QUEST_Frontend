import React from 'react';
import formSelectorStyle from './scss/formSelector.module.scss'
import {Link, useLocation} from "react-router-dom";

function FormSelector(props) {
    let {pathname} = useLocation()

    return (
        <div className={formSelectorStyle.container}>
            <Link to={'/login'}>
                <button
                    className={pathname === '/login' ? formSelectorStyle.activeBtn
                        : formSelectorStyle.defaultBtn}>Войти
                </button>
            </Link>
            {/*<Link to={'/register'}>*/}
            {/*    <button className={pathname === '/register' ? formSelectorStyle.activeBtn*/}
            {/*        : formSelectorStyle.defaultBtn}>Регистрация</button>*/}
            {/*</Link>*/}
        </div>
    );
}

export default FormSelector;
