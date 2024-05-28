import google from '../../assets/svg/google.svg'
import apple from '../../assets/svg/apple.svg'
import facebook from '../../assets/svg/bluefacebook.svg'
import style from "./register.module.scss"
import arrowleft from '../../assets/svg/whitearrowleft.svg'
import { useState, useRef, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom"

import Club from '../club/club'

const Register = () => {
    let usersarray = []

    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    usersarray = JSON.parse(localStorage.getItem('users'))

    if (!localStorage.getItem('activeuser')) {
        localStorage.setItem('activeuser', JSON.stringify([]));
    }

    const signuparray = [google, apple, facebook]
    const genders = ['Male', 'Female', 'Other']

    const [way, setway] = useState()
    const [gender, setgender] = useState()

    const agreeRef = useRef()
    const loggedRef = useRef()
    const firstRef = useRef()
    const lastRef = useRef()
    const genderRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const agreetextRef = useRef()
    const loggedtextRef = useRef()
    const sadmessRef = useRef()

    function Checkdone() {
        if (loggedRef.current.checked && agreeRef.current.checked && firstRef.current.value && lastRef.current.value && emailRef.current.value && passwordRef.current.value && (usersarray.every((v) => v.email != emailRef.current.value) ? true : '')) { //
            setway('../site')
        } else {
            setway('')
        }
    }
    return (
        <div className={style.parent}>
            <div>
                <p>Register</p>
                <p>Sign up with</p>
                <span>
                    {signuparray.map((v, i) => (<button key={i} onClick={() => {
                        sadmessRef.current.style.opacity = 1
                    }}> <img src={v} /></button>))}

                </span>
                <span ref={sadmessRef}>Sorry, something went wrong, we are working on a solution</span>
                <p>OR</p>
                <p>Your Name</p>
                <input type="text" ref={firstRef} onBlur={() => { Checkdone(), firstRef.current.value ? firstRef.current.style.border = '1px solid rgb(35, 35, 33)' : '' }} placeholder='First Name' />
                <input type="text" ref={lastRef} onBlur={() => { Checkdone(), lastRef.current.value ? lastRef.current.style.border = '1px solid rgb(35, 35, 33)' : '' }} placeholder='Last Name' />
                <p ref={genderRef}>Gender</p>
                <div>
                    {genders.map((v, i) => (<span key={i}><input type="checkbox" checked={gender == v ? true : false} onClick={() => setgender(v)} /><p>{v}</p></span>))}
                </div>
                <p>Login Details</p>
                <input type="email" ref={emailRef} onBlur={() => { Checkdone(), emailRef.current.value ? emailRef.current.style.border = '1px solid rgb(35, 35, 33)' : '' }} placeholder='Email' />
                <input type="password" ref={passwordRef} onBlur={() => { Checkdone(), passwordRef.current.value ? passwordRef.current.style.border = '1px solid rgb(35, 35, 33)' : '' }} placeholder='Password' />
                <p>Minimum 8 characters with at least one uppercase, one lowercase, one special character and a number</p>
                <span> <input type="checkbox" onClick={() => Checkdone()} ref={agreeRef} /><p ref={agreetextRef}>By clicking 'Register' you agree to our website KicksClub Terms & Conditions, Kicks Privacy Notice and Terms & Conditions.</p></span>
                <span> <input type="checkbox" onClick={() => Checkdone()} ref={loggedRef} /><p ref={loggedtextRef}>Keep me logged in - applies to all log in options below. More info</p></span>
                <Link to={way}><button onClick={() => {
                    if (way === '../site') {
                        let obj = {
                            'firstname': firstRef.current.value,
                            'lastname': lastRef.current.value,
                            'email': emailRef.current.value,
                            'password': passwordRef.current.value,
                            'gender': gender.toString(),
                            'items': [],
                        }
                        usersarray.push(obj)
                        localStorage.setItem('users', JSON.stringify(usersarray))
                        localStorage.setItem('activeuser', JSON.stringify(obj))
                    } else {
                        gender ? genderRef.current.style.color = 'rgb(35, 35, 33)' : genderRef.current.style.color = 'red'
                        firstRef.current.value ? '' : firstRef.current.style.border = '1px dashed red'
                        lastRef.current.value ? '' : lastRef.current.style.border = '1px dashed red'
                        emailRef.current.value ? '' : emailRef.current.style.border = '1px dashed red'
                        passwordRef.current.value ? '' : passwordRef.current.style.border = '1px dashed red'
                        agreeRef.current.checked ? agreetextRef.current.style.color = 'rgb(35, 35, 33)' : agreetextRef.current.style.color = 'red'
                        loggedRef.current.checked ? loggedtextRef.current.style.color = 'rgb(35, 35, 33)' : loggedtextRef.current.style.color = 'red'
                    }
                }}>Register <img src={arrowleft} /></button></Link>
            </div>
            <Club></Club>
        </div>
    )
}

export default Register