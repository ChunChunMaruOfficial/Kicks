import Style from './bag.module.scss'
import { useSelector, useDispatch } from 'react-redux'

import arrow from '../../assets/svg/listingarrowdown.svg'
import like from '../../assets/svg/like.svg';
import redlike from '../../assets/svg/redlike.svg';
import trash from '../../assets/svg/trash.svg';

import { del, likemethod, plus, minus, setsize } from '../../Redux/Slice/kicksSlice.js' //методы из filterslice
import { useEffect, useRef, useState } from 'react';

function Bag({secondtext, text}) {
    const itemsarray = useSelector((state) => state.kicksReducer.itemsarray)
    let userobj = JSON.parse(localStorage.getItem('activeuser'))
    const dispatch = useDispatch();
    const sizeRef = useRef()
    const [arrayofsizes, setarrayofsizes] = useState([])
    useEffect(() => {
        setarrayofsizes(itemsarray.map((v) => v.size.sizenum))
    }, [itemsarray])
    return (
        <section className={Style.miniparent}>
            <p>{text}</p>
            { secondtext && <p>Items in your bag not reserved- check out now to make them yours.</p>}
             {userobj.items && userobj.items.map((v, i) => {
                return (<div key={i}>
                    <img src={v.img} />
                    <div className={Style.iteminfo}>
                        <span>
                            <p>{v.title}</p>
                            <p>${v.price}<span>{v.count > 1 && `x${v.count}`}</span></p>
                        </span>
                        <p>Men’s Road Running Shoes </p>
                        <p>Enamel Blue/ University White</p>
                        <div>
                            <span><p ref={sizeRef}>Size {arrayofsizes[i]}</p><img src={arrow} onClick={() => dispatch(setsize([i, !v.size.open]))} className={v.size.open === true ? Style.rotate : Style.rerotate} />
                                {v.size.open && (<div>{[...new Array(9)].map((x, y) => (<p key={y} onClick={() => { dispatch(setsize([i, false, y + 34])) }}>{y + 34}</p>))}</div>)}
                            </span>
                            <span><p>Quantity {v.count}</p><span><p onClick={() => dispatch(plus(i))} >+</p><p onClick={() => v.count > 1 ? dispatch(minus(i)) : ''}>-</p></span></span>
                        </div>
                         <span><img src={v.liked ? redlike : like} onClick={() => {
                            dispatch(likemethod([i,v.liked]))
                        }} /><img src={trash} onClick={() => dispatch(del(i))} /></span>
                    </div>
                </div>)
            })}
        </section>
    )
}

export default Bag