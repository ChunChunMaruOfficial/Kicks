import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import style from './home.module.scss'
import Newdrops from '../newdrops/newdrops.jsx'
import Skeleton from '../newdrops/skeleton.jsx'
import Reviews from '../reviews/reviews.jsx'
import Categories from '../categories/categories.jsx'


function Home({ isLoading }) {


  return (
    <>
      <div className={style.main_bunner}>
        <p className={style.DIR}>Do it<span>&nbsp;right</span></p>
        <div className={style.main_bunner_content}>
          <div className={style.main_bunner_right} />
          <div className={style.main_bunner_right} />
          <div className={style.main_bunner_left}>
            <p>Nike product of the year </p>
          </div>
          <div className={style.main_bunner_text}>
            <div className={style.main_only_text}>
              <p>NIKE AIR MAX</p>
              <p>Nike introducing the new air max for everyone's comfort</p>
            </div>
            <button className='classic_button'>Shop now</button>
          </div>
        </div>
      </div>



      <div className={style.new_drops_header}>
        <p>Don’t miss out new drops</p>
        <button className='classic_button'>Shop New Drops</button>
      </div>
      <div className={style.new_drops_body}>
        {[...new Array(4)].map((value, index) =>  isLoading ? (<Skeleton key={index} />) : (<Newdrops index={index} key={index} />) )} </div>
      <Categories />
      <Reviews />
    </>
  )
}

export default Home