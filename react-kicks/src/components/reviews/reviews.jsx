import { useState, useRef,  useEffect} from 'react'
import reviewimg1 from '../../assets/reviews/0.png'
import reviewimg2 from '../../assets/reviews/1.png'
import reviewimg3 from '../../assets/reviews/2.png'
import star from './../../assets/svg/star.svg'
import pfp from '../../assets/pfps/2.jfif'

import style from './reviews.module.scss'

function Reviews() {
    const reviewimg = [reviewimg1, reviewimg2, reviewimg3]
    let c
 window.innerWidth < 1200 ? c = 2 : c = 3 //копипаста, можно засунуть в redux
    return (
        <div className={style.reviews}>
            <div className={style.reviews_header}>
                <p>Reviews</p>
                <button className='classic_button'>see all</button>
                {/*ops! we have only 3 reviews*/}
            </div>
            <div className={style.reviews_body}>
                {[...new Array(c)].map((v, i) => (
                    <div key={i} className={style.reviews_content}>
                        <div className={style.reviews_content_head}>
                            <div className={style.reviews_content_user}>
                                <div className={style.content_user_text}>
                                    <p>Good Quality </p>
                                    <p>I highly recommend shopping from kicks</p>
                                </div>
                                <img src={pfp} alt="" />
                            </div>
                            <div className={style.reviews_stars}>
                                <img src={star} alt="" />
                                <img src={star} alt="" />
                                <img src={star} alt="" />
                                <img src={star} alt="" />
                                <img src={star} alt="" />
                                <p>5.0</p>
                            </div>
                        </div>
                        <img className={style.review_hard} src={reviewimg[i]}>
                        </img>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Reviews