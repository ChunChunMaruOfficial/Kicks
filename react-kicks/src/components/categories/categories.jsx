import { useState, useEffect } from 'react'

import lifestylearrow from '../../assets/svg/lifestylearrow.svg'
import arrowleft from '../../assets/svg/arrowleft.svg'
import arrowright from '../../assets/svg/arrowright.svg'

import style from './categories.module.scss'

function Categories() {
    const [categoriesstyle, setcategoriesstyle] = useState(style.categories_main)
    return (
        <div className={style.categories}>
            <div className={style.categories_header}>
                <p>categories</p>
                <div>
                    <button onClick={() => setcategoriesstyle(style.categories_main + ' ' + style.activeright)} className={style.leftButton}><img src={arrowleft} alt="left" /></button>
                    <button onClick={() => setcategoriesstyle(style.categories_main + ' ' + style.activeleft)} className={style.rightButton}><img src={arrowright} alt="right" /></button>
                </div>
            </div>
            <div className={style.second_parent}>
                <div className={categoriesstyle}>
                    {[...new Array(2)].map((v, i) => (
                        <div key={i} className={i === 0 ? style.categories_body + ' ' + style.categories_left : style.categories_body + ' ' + style.categories_right}>
                            {[...new Array(2)].map((v, i) => (
                                <div key={i} className={style.categories_content}>
                                    <div />
                                    <p>Lifestyle Shoes</p>
                                    <button><img src={lifestylearrow} alt="arrow" /></button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Categories