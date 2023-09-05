import {FC} from 'react';
import authStyle from './scss/auth.module.scss'
import logoPng from './../../assets/logo.png'
// @ts-ignore
import FormSelector from "./FormSelector.jsx";
import LoginForm from "./LoginForm.jsx";
import {useLocation} from "react-router-dom";
// @ts-ignore
import RegisterForm from "./RegisterForm.jsx";

const Auth: FC = () =>  {
    const {pathname} = useLocation()

    return (
        <div className={authStyle.container}>
            <div className={authStyle.authBlock}>

                <div className={authStyle.logoBlock}>
                    <div className={authStyle.logo}>
                        <div className={authStyle.logoImgBlock}><img src={logoPng} alt="logo" className={authStyle.logoImg}/></div>
                        <div className={authStyle.logoText}>QUEST</div>
                    </div>
                </div>

                <div className={authStyle.formSelector}>
                    <FormSelector />
                </div>

                {pathname==="/login" ?  <LoginForm /> : <RegisterForm/>}
            </div>

        </div>
    );
}

export default Auth;
