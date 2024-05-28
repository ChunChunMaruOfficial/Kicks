import google from '../../assets/svg/google.svg'
import apple from '../../assets/svg/apple.svg'
import facebook from '../../assets/svg/bluefacebook.svg'
import style from "./login.module.scss"
import arrowleft from '../../assets/svg/whitearrowleft.svg'
import { useState, useRef, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom"


import Club from '../club/club'

const Login = () => {
    let coincidence

    let usersarray = []
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    let userobj
    if (!localStorage.getItem('activeuser')) {
        localStorage.setItem('activeuser', JSON.stringify([]));
    }
    const [way, setway] = useState()
    const emailRef = useRef()
    const noemailRef = useRef()
    const passwordRef = useRef()
    const nopasswordRef = useRef()

    usersarray = JSON.parse(localStorage.getItem('users'))

    const signuparray = [google, apple, facebook]

    function Checkdone() {
        if (emailRef.current.value && passwordRef.current.value && checkLogin()) {
            setway('../')
        } else {
            setway('')
        }
    }

    const checkLogin = () => {
        coincidence = usersarray.find(v => v.email === emailRef.current.value);
        coincidence ? (noemailRef.current.style.opacity = 0, coincidence.password === passwordRef.current.value ? nopasswordRef.current.style.opacity = 0 : (nopasswordRef.current.style.opacity = 1, noemailRef.current.style.opacity = 0)) : noemailRef.current.style.opacity = 1
        if (coincidence && coincidence.password === passwordRef.current.value) {
            return true
        } else {
            return false
        }

    }
    return (
        <div className={style.parent}>
            <div>
                <p>Login</p>
                <p>Forgot your password? <span>then <Link to={'../register'}> register</Link> again :_)</span></p>
                <input type="email" placeholder='Email' ref={emailRef} onBlur={() => { emailRef.current.value ? emailRef.current.style.border = '1px solid rgb(35, 35, 33)' : '', Checkdone() }} />
                <p ref={noemailRef}>there is no user with this email</p>
                <input type="password" placeholder='Password' ref={passwordRef} onBlur={() => { passwordRef.current.value ? passwordRef.current.style.border = '1px solid rgb(35, 35, 33)' : '', Checkdone() }} />
                <p ref={nopasswordRef}>wrong password for this email</p>
                <span><input type='checkbox' /><p>Keep me logged in - applies to all log in options below</p></span>
                <Link to={way}><button onClick={() => {
                    checkLogin()
                    way === '../' ?
                        (userobj = {
                            'firstname': coincidence.firstname,
                            'lastname': coincidence.lastname,
                            'email': coincidence.email,
                            'password': coincidence.password,
                            'gender': coincidence.gender,
                            'items': coincidence.items
                        }, localStorage.setItem('activeuser', JSON.stringify(userobj))) : ''

                    emailRef.current.value ? '' : emailRef.current.style.border = '1px dashed red'
                    passwordRef.current.value ? '' : passwordRef.current.style.border = '1px dashed red'
                }}>Email Login <img src={arrowleft} /></button></Link>
                <span>
                    {signuparray.map((v, i) => (<button key={i} onClick={() => {
                        sadmessRef.current.style.opacity = 1
                    }}> <img src={v} /></button>))}
                </span>
            </div>
            <Club></Club>
        </div>
    )
}

export default Login