import Style from './listingpage.module.scss'
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setsorting, setorder } from '../../Redux/Slice/kicksSlice.js' //методы из filterslice

import Newdrops from '../newdrops/newdrops.jsx'
import Skeleton from '../newdrops/skeleton.jsx'

import ReactPaginate from "react-paginate";
import close from '../../assets/svg/X.svg'
import arrow from '../../assets/svg/listingarrowdown.svg';
import filter from '../../assets/svg/Filters.svg';

function Listingpage() {
    const isloading = useSelector((state) => state.kicksReducer.isloading)
    const kicksarray = useSelector((state) => state.kicksReducer.kicksarray)
    const [issizeopen, setissizeopen] = useState(0)
    const [buttonnum, setbuttonnum] = useState(0)
    const [isnumsizeopen, setisnumsizeopen] = useState(0)
    const [isrefineopen, setisrefineopen] = useState(0)
    const [iscoloropen, setiscoloropen] = useState(0)
    const [isgenderopen, setisgenderopen] = useState(0)
    const [pricerange, setpricerange] = useState(300)
    const [ispriceopen, setispriceopen] = useState(0)
    const [sorttext, setsorttext] = useState('')
    const [paginationmessage, setpaginationmessage] = useState(false)
    const [onmobilefilter, setonmobilefilter] = useState('')

    const sortRef = useRef()
    const buttonsortRef = useRef()
    
    const dispatch = useDispatch();

    const sizes = ['Casual shoes', 'Runners', 'Hiking', 'Sneaker', 'Basketball', 'Golf', 'Outdoor']
    const gernders = ['Man', 'Women']
    const colors = ['rgb(74, 105, 226)', 'rgb(255, 165, 47)', 'rgb(35, 35, 33)', 'rgb(35, 77, 65)', 'rgb(53, 51, 54)', 'rgb(240, 129, 85)', 'rgb(201, 204, 198)', 'rgb(103, 114, 130)', 'rgb(146, 85, 19)', 'rgb(187, 128, 86)']
    const sortingsettings = ['tittle', 'rating', 'popularity', 'price']

    useEffect(() => {                           
        document.addEventListener('click', ((e) => {
            if (buttonsortRef.current.contains(e.target) && sortRef.current.style.display == 'none') {
                sortRef.current.style.display = 'block'
            } else {
                sortRef.current.style.display = 'none'
            }
        }));
    }, []);

    return (
        <div className={Style.parent}>
            <figure>
                <p>Limited time only</p>
                <p>Get 30% off</p>
                <p>Sneakers made with your comfort in mind so you can put all of your focus into your next session.</p>
            </figure>

            <div className={Style.head}>
                <button onClick={() => setonmobilefilter(onmobilefilter != Style.showright ? Style.showright : Style.hideleft)}>Filters<img src={filter} /></button>
                <span>
                    <p>Life Style Shoes</p>
                    <p>∞ items</p>
                </span>
                <span>
                <button ref={buttonsortRef}>Sorting by {sorttext}<img src={arrow} />
                    <div ref={sortRef}>{sortingsettings.map((v, i) => (<p key={i} onClick={(e) => {dispatch(setsorting(e.target.innerText.toLowerCase())), setsorttext(e.target.innerText), console.log('захват');}}>{v}</p>))}</div>
                </button>
                <span>
                    <button onClick={() => dispatch(setorder('desc'))}><img src={arrow}  /></button>
                    <button onClick={() => dispatch(setorder('asc'))}><img src={arrow}  /></button>
                </span>
                </span>
            </div>
            <section>
                <aside className={onmobilefilter}>
                    <img src={close} alt="X" onClick={() => setonmobilefilter(Style.hideleft)} />
                    <p>Filters</p>
                    <p>Refine by <img onClick={() => setisrefineopen(!isrefineopen)} src={arrow} className={isrefineopen ? Style.rerotate : Style.rotate} /></p>
                    <div className={isrefineopen ? Style.ending : Style.opening}>
                        <span>Mens</span>
                        <span>Casual</span>
                    </div>
                    <p>Size <img onClick={() => setisnumsizeopen(!isnumsizeopen)} src={arrow} className={isnumsizeopen ? Style.rerotate : Style.rotate} /></p>
                    <div className={isnumsizeopen ? Style.ending : Style.opening}>
                        {[...new Array(11)].map((v, i) => {
                            return (<div key={i} onClick={() => setbuttonnum(i)} className={buttonnum == i ? Style.selectedsize : ''}>{i + 38}</div>)
                        })}
                    </div>
                    <p>Refine by <img onClick={() => setiscoloropen(!iscoloropen)} src={arrow} className={iscoloropen ? Style.rerotate : Style.rotate} /></p>
                    <div className={iscoloropen ? Style.ending : Style.opening}>
                        {[...new Array(10)].map((v, i) => {
                            return (<div key={i} style={{
                                backgroundColor: colors[i]
                            }} ></div>)
                        })}
                    </div>
                    <p>Size <img onClick={() => setissizeopen(!issizeopen)} src={arrow} className={issizeopen ? Style.rerotate : Style.rotate} /></p>
                    <div>
                        <div className={issizeopen ? Style.ending : Style.opening}>
                            {sizes.map((v, i) => (<span key={i}><input type="checkbox" /> &ensp;{v}</span>))}
                        </div>
                    </div>
                    <p>Gender <img onClick={() => setisgenderopen(!isgenderopen)} src={arrow} className={isgenderopen ? Style.rerotate : Style.rotate} /></p>
                    <div>
                        <div className={isgenderopen ? Style.ending : Style.opening}>
                            {gernders.map((v, i) => (<span key={i}><input type="checkbox" /> &ensp;{v}</span>))}
                        </div>
                    </div>
                    <p>Price <img onClick={() => setispriceopen(!ispriceopen)} src={arrow} className={ispriceopen ? Style.rerotate : Style.rotate} /></p>
                    <div className={ispriceopen ? Style.ending : Style.opening}>
                        <input type="range" onChange={(v) => { setpricerange(v.target.value) }} min="0" max="1000" />
                        <span><p>${pricerange}</p><p>$1000</p></span>
                    </div>
                </aside>
                <main>
                    {[...new Array(3)].map((v,i) =>
                        <div className={Style.new_drops_body}>
                            {[...new Array(4)].map((value, index) => isloading ? (<Skeleton key={index} />) : kicksarray[index+(4*i)] ? (kicksarray[index+(4*i)].price < pricerange && <Newdrops index={index+(4*i)} key={index}/>) : (kicksarray[index].price < pricerange && <Newdrops index={index} key={index}/>))}
                        </div>)}
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next >"
                        onPageChange={() => setpaginationmessage(true)} // изменить стриницу при нажатии на кнопку пагинации
                        pageRangeDisplayed={4}
                        pageCount={3} //всего страниц
                        previousLabel="< Previous"
                        renderOnZeroPageCount={null}
                        disabledClassName={Style.disabled + ' ' + Style.paginationcontrol}
                        activeClassName={Style.active + ' ' + Style.paginationcontrol}
                        previousClassName={Style.arrows + ' ' + Style.paginationcontrol}
                        nextClassName={Style.arrows + ' ' + Style.paginationcontrol}
                        containerClassName={Style.pagination + ' ' + Style.paginationcontrol}
                    />
                    {paginationmessage && (<div className={Style.paginationmessage}>Sorry, our range is very small 😅</div>)}
                </main>

            </section>
        </div>
    )

}
export default Listingpage