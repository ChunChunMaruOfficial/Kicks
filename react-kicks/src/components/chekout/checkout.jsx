import Style from './checkout.module.scss'
import { useState, useRef, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom"

import Newdrops from '../newdrops/newdrops.jsx'
import Skeleton from '../newdrops/skeleton.jsx'

import Bag from '../bag/bag'
import Totalprice from '../totalprice/totalprice.jsx'


function Checkout({ isLoading }) {
    const userobj = JSON.parse(localStorage.getItem('activeuser'))

    const [way, setway] = useState()
    const [delopt, setdelopt] = useState(-2)
    const [isspansopen, setisspansopen] = useState()


    const emailRef = useRef()
    const deliverytextRef = useRef()
    const deliveryRef = useRef()
    const collectRef = useRef()
    const fisrtnameRef = useRef()
    const lastnameRef = useRef()
    const addressRef = useRef()
    const phoneRef = useRef()
    const delinfRef = useRef()
    const ageRef = useRef()
    const delinfcheckRef = useRef()
    const agecheckRef = useRef()

    function Checkdone() {
        if (delinfcheckRef.current.checked && agecheckRef.current.checked && fisrtnameRef.current.value && lastnameRef.current.value && addressRef.current.value && phoneRef.current.value && (delopt === 0 || delopt === 6)) {
            setway('../home')
        } else {
            setway('')
        }
    }

    useEffect(
        () => {
            if (userobj && userobj.length != 0) {
                fisrtnameRef.current.value = userobj.firstname
                lastnameRef.current.value = userobj.lastname
                emailRef.current.value = userobj.email
            }
        }, []
    )




    return (
        <div className={Style.parent}>

            <div>
                {userobj == undefined || userobj.lenght == 0 ? (<content><Link to={'../login'}>Login</Link> and Checkout faster</content>) : ''}
                <p>Contact Details</p>
                <p>We will use these details to keep you inform about your delivery.</p>
                <input type="email" placeholder='Email' ref={emailRef} />
                <p>Shipping Address</p>
                <span>
                    <input ref={fisrtnameRef} onBlur={() => { fisrtnameRef.current.value ? fisrtnameRef.current.style.border = '1px solid rgb(35, 35, 33)' : '', Checkdone() }} type="text" placeholder='First Name*' />
                    <input ref={lastnameRef} onBlur={() => { lastnameRef.current.value ? lastnameRef.current.style.border = '1px solid rgb(35, 35, 33)' : '', Checkdone() }} type="text" placeholder='Last Name*' />
                </span>
                <input ref={addressRef} onBlur={() => { addressRef.current.value ? addressRef.current.style.border = '1px solid rgb(35, 35, 33)' : '', Checkdone() }} type="text" placeholder='Find Delivery Address*' />
                <p>Start typing your street address or zip code for suggestion</p>
                <input ref={phoneRef} onBlur={() => { phoneRef.current.value ? phoneRef.current.style.border = '1px solid rgb(35, 35, 33)' : '', Checkdone() }} type="tel" placeholder='Phone Number*' />
                <p>E.g. (123) 456-7890</p>
                <p ref={deliverytextRef}>Delivery Options</p>
                <div ref={deliveryRef} onClick={(v) => { setdelopt(6), console.log(delopt), v.target.className = Style.active, collectRef.current.className = "", Checkdone(), deliverytextRef.current.style.color = 'rgb(35, 35, 33)', setisspansopen(true) }}><span><p>Standard Delivery</p><p>$6.00</p></span>
                    <p>Enter your address to see when you’ll get your order</p></div>
                <div ref={collectRef} onClick={(v) => { setdelopt(0), console.log(delopt), v.target.className = Style.active, deliveryRef.current.className = "", Checkdone(), deliverytextRef.current.style.color = 'rgb(35, 35, 33)', setisspansopen(true) }}><span><p>Collect in store</p><p>Free</p></span>
                    <p>Pay now, collect in store</p></div>  {/*спросить учителя, почему не работает :_)*/}
                <div className={isspansopen ? Style.opening : ""}>
                    <span><input type="checkbox" ref={delinfcheckRef} onClick={() => Checkdone()} /> <p ref={delinfRef}>My billing and delivery information are the same</p></span>
                    <span><input type="checkbox" ref={agecheckRef} onClick={() => Checkdone()} /> <p ref={ageRef}>I’m 13+ year old</p></span>
                    <p>Also want product updates with our newsletter?</p>
                    <span><input type="checkbox" /> <p>Yes, I’d like to receive emails about exclusive sales and more.</p></span>
                </div>
                <Link to={way}><button onClick={() => {
                    delopt || delopt === 0 ? '' : deliverytextRef.current.style.color = 'red'
                    delinfcheckRef.current.checked ? '' : delinfRef.current.style.color = 'red'
                    agecheckRef.current.checked ? '' : ageRef.current.style.color = 'red'
                    fisrtnameRef.current.value ? '' : fisrtnameRef.current.style.border = '1px dashed red'
                    lastnameRef.current.value ? '' : lastnameRef.current.style.border = '1px dashed red'
                    addressRef.current.value ? '' : addressRef.current.style.border = '1px dashed red'
                    phoneRef.current.value ? '' : phoneRef.current.style.border = '1px dashed red'
                }
                }>Review AND PAY</button></Link>

            </div>
            <div>
                <Totalprice button={false}></Totalprice>
                <Bag secondtext={false} text={'Order Details'}></Bag>
            </div>


        </div>
    )
}

export default Checkout