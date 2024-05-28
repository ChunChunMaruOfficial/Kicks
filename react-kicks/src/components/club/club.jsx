
import style from './club.module.scss'
import arrowleft from '../../assets/svg/whitearrowleft.svg'

const Club = () => {
    return (
        <div className={style.parent}>
            <p>Join  Kicks Club Get Rewarded Today.</p>
            <p>As kicks club member you get rewarded with what you love for doing what you love. Sign up today and receive immediate access to these Level 1 benefits:</p>
            <ul>
                <li>Free shipping​</li>
                <li> A 15% off voucher for your next purchase​</li>
                <li> Access to Members Only products and sales​</li>
                <li> Access to adidas Running and Training apps​</li>
                <li> Special offers and promotions​</li>
            </ul>
            <p>Join now to start earning points, reach new levels and unlock more rewards and benefits from adiClub.​</p>
            <button>Join the club <img src={arrowleft} /></button>
        </div>
    )
}

export default Club