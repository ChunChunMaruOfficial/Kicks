import { useState, useRef, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import style from './app.module.scss'

import Listingpage from '../listingpage/listingpage.jsx'
import Productpage from '../productpage/productpage.jsx'
import Home from '../home/home.jsx'
import Cart from '../cart/cart.jsx'
import Checkout from '../chekout/checkout.jsx'
import Register from '../register/register.jsx'
import Login from '../login/login.jsx'
import Newdrops from '../newdrops/newdrops.jsx'

import menu from '../../assets/svg/menu.svg'
import headerarrow from '../../assets/svg/headerarrow.svg'
import logo from '../../assets/svg/logo.svg'
import search from '../../assets/svg/search.svg'
import account from '../../assets/svg/account.svg'
import headerfooterlogo from '../../assets/svg/headerfooterlogo.svg'
import biglogo from '../../assets/svg/biglogo.svg'
import facebook from '../../assets/svg/facebook.svg'
import twitter from '../../assets/svg/twitter.svg'
import instagram from '../../assets/svg/instagram.svg'
import tiktok from '../../assets/svg/tiktok.svg'
import X from '../../assets/svg/X.svg'
import whiteX from '../../assets/svg/whiteX.svg'

import axios from 'axios'
import { init, setisloading } from '../../Redux/Slice/kicksSlice.js'
/*вопросеки к учителю:
1. запрос на обновление DOM (типа для выхода из акк) */
function App() {
    const sorting = useSelector((state) => state.kicksReducer.sorting)
    const isloading = useSelector((state) => state.kicksReducer.isloading)
    const order = useSelector((state) => state.kicksReducer.order)
    let userobj
    if (!localStorage.getItem('activeuser')) {
        localStorage.setItem('activeuser', JSON.stringify([]));
    } else{
        userobj = JSON.parse(localStorage.getItem('activeuser'))
    }

    const itemsarray = useSelector((state) => state.kicksReducer.itemsarray)
    const kicksarray = useSelector((state) => state.kicksReducer.kicksarray)
    const [onsearch, setonsearch] = useState(false)
    const [filtersearch, setfiltersearch] = useState('')
    const [onmobileheader, setonmobileheader] = useState(style.mobile_header)
    const list = ['Shoe categories', 'Brands', 'Characteristics', 'Collections', 'Popular models']
    const categories = ['Runners', 'Sneakers', 'Basketball', 'Outdoor', 'Golf', 'Hiking']
    const company = ['Blogs', 'Contact', 'About']
    const dispatch = useDispatch()

    function arrayinit() {
        axios.get(`https://65e621a2d7f0758a76e82b86.mockapi.io/kicks?${sorting}${order}`)
            .then((res) => {
                const newData = res.data.map((v) => ({ ...v, count: 1, liked: false, size: { open: false, sizenum: 36 } }))
                dispatch(init(newData));
                dispatch(setisloading(false))
            })
    }

    useEffect(() => {
        isloading && arrayinit()
    }, [sorting, order])

    const social = [{
        link: 'https://www.facebook.com/',
        name: facebook
    },
    {
        link: 'https://www.instagram.com/',
        name: instagram
    },
    {
        link: 'https://twitter.com/',
        name: twitter
    },
    {
        link: 'https://www.tiktok.com/',
        name: tiktok
    }
    ]
    return (
        <>

            <div className={onmobileheader}>
                <img onClick={() => setonmobileheader(style.mobile_header + ' ' + style.hideleft)} className={style.button} src={menu} alt="close" />
                <p >New Drops 🔥</p>
                <p>Men</p>
                <ul>
                    {
                        list.map((v, i) => {
                            return (<Link key={i} to='./listingpage'><li onClick={() => setonmobileheader(style.mobile_header + ' ' + style.hideleft)}>{v}</li></Link>)
                        })
                    }
                </ul>
                <p>Women</p>
                <ul>
                    {
                        list.map((v, i) => {
                            return (<Link key={i} to='./listingpage'><li onClick={() => setonmobileheader(style.mobile_header + ' ' + style.hideleft)}>{v}</li></Link>)
                        })
                    }
                </ul>
            </div>
            <div className={onsearch ? style.column + ' ' + style.blurred : style.column}>
                <header className={onsearch ?  style.onsearch : ''}>
                    <img className={style.menu_button} onClick={() => setonmobileheader(style.mobile_header + ' ' + style.showright)} src={menu} alt="" />
                    <div className={style.header_left}>
                        <p onClick={() => newdropsRef.current.scrollIntoView({ block: "center", behavior: "smooth" })}>New Drops 🔥</p>
                        <div className={style.header_left_context}>
                            <p>Men</p>
                            <img src={headerarrow} alt="down arrow" />
                            <div className={style.dropdown_content + ' ' + style.dropdown}>
                                {list.map((v, i) => {
                                    return (<Link key={i} to='./listingpage'>{v}</Link>)
                                })}
                            </div>
                        </div>
                        <div className={style.header_right_context}>
                            <p>Women</p>
                            <img src={headerarrow} alt="down arrow" />
                            <div className={style.dropdown_content + ' ' + style.dropdownW}>
                                {list.map((v, i) => {
                                    return (<Link key={i} to='./listingpage'>{v}</Link>)
                                })}
                            </div>
                        </div>
                    </div>
                    <Link to='./'>
                        <img src={logo} alt="Logo" />
                    </Link>
                    <div className={style.header_right}>
                        <img className={style.search} onClick={() => setonsearch(true)} src={search} alt="Search" />
                        <Link to='./cart'>
                            <img src={account} title=""/></Link>
                        <Link to='./checkout'>
                            <div className={style.header_user} onClick={() => setonsearch(false)}>
                                <p>{itemsarray.length}</p> {/* кол-во покупок */}
                            </div>
                        </Link>
                    </div>
                    {onsearch && (<>
                        <div className={style.header_input}>
                            <input type="text" value={filtersearch} className={style.header_input_input} onChange={(e) => { setfiltersearch(e.target.value) }} />
                            <button onClick={() => setonsearch(false)} className='classic_button' ><img src={whiteX}/></button>
                        </div>
                        <div className={style.searching_elements + ' ' + style.new}>

                            {isloading ? '' :
                                kicksarray.map((v, i) =>
                                    v.tittle.toLowerCase().includes(filtersearch.toLowerCase()) ? <Newdrops search={true} index={i} key={i} /> : ''
                                )
                            }
                        </div>
                    </>
                    )}

                </header>
                <Routes>
                    <Route path='/*' element={<Home isLoading={isloading} />} />
                    <Route path='/productpage' element={<Productpage isLoading={isloading}/>} />
                    <Route path='/listingpage' element={<Listingpage isLoading={isloading} />} />
                    <Route path='/cart' element={<Cart isLoading={isloading} />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
                <footer >
                    <div className={style.footer_header}>
                        <div className={style.footer_header_left}>
                            <div className={style.header_left_first}>
                                <p>Join our KicksPlus Club &amp; get 15% off</p>
                                <p>Sign up for free! Join the community.</p>
                            </div>
                            <div className={style.header_left_second}>
                                <input type="email" placeholder="Email adress" className={style.header_left_second_input} />
                                <button className={style.black_button}>submit</button>
                            </div>
                        </div>
                        <img src={headerfooterlogo} alt="logo" />
                    </div>
                    <div className={style.footer_main}>
                        <img src={biglogo} alt="Very big logo" />
                        <div className={style.footer_main_left}>
                            <p>About us</p>
                            <p>We are the biggest hyperstore in the universe. We got you all cover with our exclusive
                                collections and latest drops.</p>
                        </div>
                        <div className={style.footer_main_right}>
                            <div>
                                <p className={style.yellowtext}>Categories</p>
                                <ul>
                                    {categories.map((v, i) => {
                                        return (<Link key={i} to='./listingpage'><li onClick={() => setonmobileheader(style.mobile_header + ' ' + style.hideleft)}>{v}</li></Link>)
                                    })}
                                </ul>
                            </div>
                            <div>
                                <p className={style.yellowtext}>Company</p>
                                <ul>
                                    {company.map((v, i) => {
                                        return (<li key={i}>{v}</li>)
                                    })}
                                </ul>
                            </div>
                            <div className={style.Follow_us}>
                                <p className={style.yellowtext}>Follow us</p>
                                <div> {social.map((v, i) => (<a key={i} href={v.link}><img src={v.name} alt={v.name} /></a>))
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default App
