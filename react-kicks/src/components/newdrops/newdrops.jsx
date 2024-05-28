import style from './newdrops.module.scss'
import star from './../../assets/svg/star.svg'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link } from "react-router-dom"
import { add } from '../../Redux/Slice/kicksSlice.js' //методы из filterslice
import { useState } from 'react'


function Newdrops({ search, index }) {
    const userobj = JSON.parse(localStorage.getItem('activeuser'))
    const kicksarray = useSelector((state) => state.kicksReducer.kicksarray)
    const [textstyle, settextstyle] = useState()
    let c
    c ? "" : window.innerWidth < 1200 && window.innerWidth > 900 ? c = 3 : c = 4
    const dispatch = useDispatch();
    let obj
    return (
        <div className={search ? style.new_drops_frame : style.new_drops_frame + ' ' + style.plus} key={index}>
            <Link to="../productpage">
                <img className={style.frame_img} src={kicksarray[index].imgURL} onClick={() => window.scrollTo(0, 0)} />
                <div>
                    <p>{kicksarray[index].rating} <img src={star} /></p>
                </div>
            </Link>
            <div className={style.frame_text}>
                <p>{kicksarray[index].tittle.toUpperCase()}</p>
                <button className={style.black_button} onClick={() => {
                    userobj == undefined || userobj.length == 0 ? settextstyle(style.nologin) : (
                        obj = {
                            img: kicksarray[index].imgURL,
                            title: kicksarray[index].tittle,
                            price: kicksarray[index].price,
                            count: kicksarray[index].count,
                            size: kicksarray[index].size
                        }, dispatch(add(obj))

                    )

                }}>Add to cart - <span>${kicksarray[index].price}</span></button>
                <p className={textstyle}>please <Link to='../login' onClick={() => window.scrollTo(0, 0)}>log in</Link> or<Link to='../register' onClick={() => window.scrollTo(0, 0)}> register</Link></p>
            </div>
        </div>
    )

}

export default Newdrops