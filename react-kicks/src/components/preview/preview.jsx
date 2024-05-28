import kicks from '../../assets/svg/logo.svg'
import google from '../../assets/svg/google.svg'
import apple from '../../assets/svg/apple.svg'
import facebook from '../../assets/svg/bluefacebook.svg'
import style from "./Preview.module.scss"
import previewpic from '../../assets/previewimg.png'

import { useState, useRef, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom"

const Preview = () => {
  let usersarray = []

  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }

  usersarray = JSON.parse(localStorage.getItem('users'))

  const signuparray = [google, apple, facebook]
  const [way, setway] = useState()
  const agreeRef = useRef()
  const loggedRef = useRef()
  const firstRef = useRef()
  const lastRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const agreetextRef = useRef()
  const loggedtextRef = useRef()

  function Checkdone() {
    if (loggedRef.current.checked && agreeRef.current.checked && firstRef.current.value && lastRef.current.value && emailRef.current.value && passwordRef.current.value) {
      setway('../site')
    } else {
      setway('')
    }
  }
  return (
    <main className={style.body}>
      <div>
        <img src={previewpic} /><img src={kicks} /></div>
      <div>
        <p>Register</p>
        <p>Sign up with</p>
        <span>
          {signuparray.map((v, i) => (<button key={i}> <img src={v} /></button>))}
        </span>
        <p>OR</p>
        <p>Your Name</p>
        <input type="text" ref={firstRef} onBlur={() => { Checkdone(), firstRef.current.value ? firstRef.current.style.border = '1px solid rgb(35, 35, 33)' : '' }} placeholder='First Name' />
        <input type="text" ref={lastRef} onBlur={() => { Checkdone(), lastRef.current.value ? lastRef.current.style.border = '1px solid rgb(35, 35, 33)' : '' }} placeholder='Last Name' />
        <p>Login Details</p>
        <input type="email" ref={emailRef} onBlur={() => { Checkdone(), emailRef.current.value ? emailRef.current.style.border = '1px solid rgb(35, 35, 33)' : '' }} placeholder='Email' />
        <input type="password" ref={passwordRef} onBlur={() => { Checkdone(), passwordRef.current.value ? passwordRef.current.style.border = '1px solid rgb(35, 35, 33)' : '' }} placeholder='Password' />
        <p>Minimum 8 characters with at least one uppercase, one lowercase, one special character and a number</p>
        <span> <input type="checkbox" onClick={() => Checkdone()} ref={agreeRef} /><p ref={agreetextRef}>By clicking 'Log In' you agree to our website KicksClub Terms & Conditions, Kicks Privacy Notice and Terms & Conditions.</p></span>
        <span> <input type="checkbox" onClick={() => Checkdone()} ref={loggedRef} /><p ref={loggedtextRef}>Keep me logged in - applies to all log in options below. More info</p></span>
        <Link to={way}><button onClick={() => {
          console.log(way);
          firstRef.current.value ? '' : firstRef.current.style.border = '1px dashed red'
          lastRef.current.value ? '' : lastRef.current.style.border = '1px dashed red'
          emailRef.current.value ? '' : emailRef.current.style.border = '1px dashed red'
          passwordRef.current.value ? '' : passwordRef.current.style.border = '1px dashed red'
          agreeRef.current.checked ? '' : agreetextRef.current.style.color = 'red'
          loggedRef.current.checked ? '' : loggedtextRef.current.style.color = 'red'

          if (way === '../site') {
            console.log('called dont worry');
            let obj = {
              'firstname': firstRef.current.value,
              'lastname': lastRef.current.value,
              'email': emailRef.current.value,
              'password': passwordRef.current.value
            }
            usersarray.push(obj)
            localStorage.setItem('users', JSON.stringify(usersarray))
          } else{
            alert('мямямям')
          }
        }}>Register</button></Link>
      </div>
    </main>
  )
}

export default Preview