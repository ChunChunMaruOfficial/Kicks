import { useEffect, useState, useRef } from 'react';
import Style from './totalprice.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link } from "react-router-dom"

import exiit from '../../assets/svg/exit.svg'

function Totalprice({ button }) {
    const itemsarray = useSelector((state) => state.kicksReducer.itemsarray)
    const [totalprice, settotalprice] = useState(0)
    const [way, setway] = useState('')
    const zerpriceRef = useRef()
    useEffect(() => {
        let t = 0;
        itemsarray.forEach((item) => {
            t += item.price * item.count;
        });
        totalprice ? setway('../checkout') : setway('')
        settotalprice(t);
    }, [itemsarray]);
    const userobj = JSON.parse(localStorage.getItem('activeuser'))
    return (
        <div className={Style.maininfo}>
            {userobj && userobj.length != 0 && (<div className={Style.account}>
                <p>Your Personal Data</p>
                <span><p>First Name</p><p>{userobj.firstname}</p></span>
                <span><p>Last Name</p><p>{userobj.lastname}</p></span>
                <span><p>Email</p><p>{userobj.email}</p></span>
                <span><p>Gender</p><p>{userobj.gender}</p></span>
                {button && (<button onClick={() => localStorage.removeItem('activeuser')}>log out of your account <img src={exiit}/> </button>)}
            </div>)}
            <div className={Style.totalprice}>
                <p>Order Summary</p>
                <span><p>{itemsarray.length} ITEM</p><p>${totalprice}</p></span>
                <span><p>Delivery</p><p>${totalprice ? 6 * itemsarray.length + 0.99 : 0}</p></span>
                <span><p>Sales Tax</p><p>-</p></span>
                <span><p>Total</p><p>${totalprice ? totalprice + (6 * itemsarray.length + 0.99) : 0}</p></span>
                {button && (<>
                    <Link to={way}><button>Checkout</button></Link>
                    <p ref={zerpriceRef}>how so? You haven't added anything to your cart yet</p>
                    <a href="https://youtu.be/dQw4w9WgXcQ?si=9QqOQhi1Gmy6TJRc">User a promo code</a></>)}
            </div>
        </div>
    )
}

export default Totalprice