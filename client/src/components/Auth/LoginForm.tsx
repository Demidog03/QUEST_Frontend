import{useEffect ,FC} from 'react';
import authFormStyle from './scss/authForm.module.scss'
// @ts-ignore
import TextInput from "./TextInput.jsx";
import {IoKey, IoMail} from "react-icons/io5";
// @ts-ignore
import PassInput from "./PassInput.jsx";
import authStyle from "./scss/auth.module.scss";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {authUserSelector, login} from '../../store/features/auth/authSlice.ts'



const LoginForm: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(authUserSelector)

    useEffect(() => {
        if(user) {
            navigate("/projects")
        }
    }, [navigate, user])


    let {register,
        handleSubmit,
        formState: {errors, dirtyFields},
        reset
    } = useForm(
        {mode: 'onChange'}
    )

    let passValidation = {
        required: true,
        pattern: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/
    }

    let onSubmitToLogin = (data: any) => { //TODO change "any" type
        const {username, password} = data
        dispatch(login({username, password}))
        reset()
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitToLogin)}>
                <div className={authFormStyle.container}>
                    <TextInput inIcon={IoMail}
                               inPlaceholder={"Электронная почта"} register={register}
                               error={errors.email} name='username' isDirty={dirtyFields.email}
                               // regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
                    />

                    <PassInput inIcon={IoKey}
                               inPlaceholder={"Пароль"} register={register}
                               error={errors.password} name='password' isDirty={dirtyFields.password}
                               validation={passValidation}
                    />
                </div>
                <div className={authStyle.submitBlock}>
                    <button className={authStyle.submitBtn} type='submit' disabled={
                        Object.keys(errors).length !== 0 || Object.keys(dirtyFields).length !== 2
                    }>Войти</button>
                    {/*//PERMANENT NOT DISABLED LOGIN BUTTON*/}
                    {/*<button className={authStyle.submitBtn} type='submit'>Войти</button>*/}
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
