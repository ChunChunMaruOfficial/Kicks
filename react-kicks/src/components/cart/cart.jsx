import Style from './cart.module.scss'
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link } from "react-router-dom"

import Newdrops from '../newdrops/newdrops.jsx'
import Skeleton from '../newdrops/skeleton.jsx'

import Bag from '../bag/bag'
import Totalprice from '../totalprice/totalprice.jsx'

function Cart({ isLoading }) {
    const userobj = JSON.parse(localStorage.getItem('activeuser'))
    return (
        <div className={Style.parent}>
            <p>Saving to celebrate </p>
            <p>Enjoy up to 60% off thousands of styles during the End of Year sale - while suppiles last. No code needed.</p>
            {userobj == undefined || userobj.length == 0 ? (<p><Link to={'../register'}>Join us</Link>  or <Link to={'../login'}>Sign-in</Link></p>) : ''}
            <main>
                <Bag secondtext={true} text={'Your Bag'} />
                <Totalprice button={true} />
            </main>
            <div className={Style.new_drops_header}>
                <p>You may also like</p>
                <button className='classic_button'>Shop New Drops</button>
            </div>
            <div className={Style.new_drops_body}>
                {[...new Array(4)].map((value, index) => isLoading ? (<Skeleton key={index} wid={245} />) : (<Newdrops index={index} key={index} />))} </div>
        </div>
    )
}

export default Cart