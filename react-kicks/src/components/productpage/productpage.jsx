import Style from './productpage.module.scss'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link } from "react-router-dom"
import { add } from '../../Redux/Slice/kicksSlice.js' //методы из filterslice

import Newdrops from '../newdrops/newdrops.jsx'
import Skeleton from '../newdrops/skeleton.jsx'

import firstblue from '../../assets/product_page/4DFWD blue/0.png'
import secondblue from '../../assets/product_page/4DFWD blue/1.png'
import thirdblue from '../../assets/product_page/4DFWD blue/2.png'
import fourthblue from '../../assets/product_page/4DFWD blue/3.png'
import firstgreen from '../../assets/product_page/4DFWD green/10.png'
import secondgreen from '../../assets/product_page/4DFWD green/11.png'
import thirdgreen from '../../assets/product_page/4DFWD green/12.png'
import fourthgreen from '../../assets/product_page/4DFWD green/13.png'

import firstmiamiultraboost from '../../assets/product_page/adidas ULTRA BOOST 1.0 MIAMI/0.png'
import secondmiamiultraboost from '../../assets/product_page/adidas ULTRA BOOST 1.0 MIAMI/1.png'
import thirdmiamiultraboost from '../../assets/product_page/adidas ULTRA BOOST 1.0 MIAMI/2.png'
import fourthmiamiultraboost from '../../assets/product_page/adidas ULTRA BOOST 1.0 MIAMI/3.png'

import firstshadowgreenoxide from '../../assets/product_page/OZELIA SHADOW GREEN OXIDE/0.png'
import secondshadowgreenoxide from '../../assets/product_page/OZELIA SHADOW GREEN OXIDE/1.png'
import thirdshadowgreenoxide from '../../assets/product_page/OZELIA SHADOW GREEN OXIDE/2.png'
import fourthshadowgreenoxide from '../../assets/product_page/OZELIA SHADOW GREEN OXIDE/3.png'

function Productpage({isLoading}) {
    const kicksarray = useSelector((state) => state.kicksReducer.kicksarray)

    const [buttonnum, setbuttonnum] = useState(0)
    const [colornum, setcolornum] = useState(0)
    const [pridimgs, setpridimgs] = useState([firstblue, secondblue, thirdblue, fourthblue])
    const dispatch = useDispatch();

    useEffect(() => {
        colornum == 0 ? setpridimgs([firstblue, secondblue, thirdblue, fourthblue]) :
            setpridimgs([firstgreen, secondgreen, thirdgreen, fourthgreen])
    }, [colornum])
    let obj

    const addfun = () => {
        obj = {
            img: kicksarray[0].imgURL,
            title: kicksarray[0].tittle,
            price: kicksarray[0].price,
            count: kicksarray[0].count,
            size: { open: false, sizenum: buttonnum + 38 }
        }
        dispatch(add(obj))
    }

    return (
        <>
            <div className={Style.page}>
                <div>
                    {[...new Array(4)].map((v, i) => {
                        return (<img key={i} src={pridimgs[i]} className={Style.foto} />)
                    })}
                </div>
                <div>
                    <div>New Release</div>
                    <p>ADIDAS 4DFWD X PARLEY RUNNING SHOES</p>
                    <p>$220.00</p>
                    <p>Color</p>
                    <span>{[...new Array(2)].map((v, i) => {
                        return (<div key={i} onClick={() => setcolornum(i)} className={colornum == i ? Style.selectedcolor : ''}></div>)
                    })}</span>
                    <p>Size</p>
                    <span>
                        {[...new Array(11)].map((v, i) => {
                            return (<button key={i} onClick={() => setbuttonnum(i)} className={buttonnum == i ? Style.selectedsize : ''}>{i + 38}</button>)
                        })}
                    </span>
                    <span>
                        <button onClick={() => {
                            addfun()
                        }}>Add to cart</button>
                        <button>❤</button>
                    </span>
                    <Link to='../checkout'>
                        <button onClick={() => {
                            addfun()
                        }}>Buy it now</button></Link>
                    <div>
                        <p>About the product</p>
                        <p>Shadow Navy / Army Green
                            <br /><br />
                            This product is excluded from all promotional discounts and offers. </p>
                        <br />
                        <ul>
                            <li>Pay over time in interest-free installments with Affirm, Klarna or Afterpay.</li>
                            <li>Join adiClub to get unlimited free standard shipping, returns, & exchanges.</li>
                        </ul>

                    </div>
                </div></div>
            <div className={Style.new_drops_header}>
                <p>You may also like</p>
                <button className='classic_button'>Shop New Drops</button>
            </div>
            <div className={Style.new_drops_body}>
                {[...new Array(4)].map((v, i) => isLoading ? (<Skeleton key={i} />) : (<Newdrops index={i} key={i} />))} </div>

        </>
    )
}

export default Productpage