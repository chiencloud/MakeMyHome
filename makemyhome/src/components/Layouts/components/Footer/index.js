import { Link } from 'react-router-dom';
import { productCategories, shareYouMoments } from '~/apis';
import { SliderMain } from '~/components/Slider';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    const ShareMoments = () => {

        const settingsUpdate = {
            dots: false,
            infinite: true,
            speed: 1200,
            slidesToShow: 4,
            slidesToScroll: 4,
            // prevArrow: <PrevArrow />,
            // nextArrow: <NextArrow />,
        };

        return (
            <div className={cx('footerTop')}>
                <div className={cx('footerTopLeft')}>
                    <SliderMain settingsUpdate={settingsUpdate}>
                        {shareYouMoments.map((shareYouMoment, index) => {
                            return (
                                <div key={index} className={cx('shareMomentImg')}>
                                    <Link to="#"><img src={shareYouMoment.image} alt=""/></Link>
                                </div>
                            );
                        })}
                    </SliderMain>
                </div>
                <div className={cx('footerTopRight')}>
                    <Link to="#"><h3>Chia sẻ khoảnh khắc</h3></Link>
                </div>
            </div>
        );
    };

    const FooterBottom = () => {

        return (
            <div className={cx("footerBottom")}>
                <h2>minimal living</h2>
                <div><img src="https://res.cloudinary.com/dseuvenfm/image/upload/v1651981978/MakeMyHome/dmca_protected_16_120_dsxyco.png" alt=""/></div>
            </div>
        )
    }

    return (
        <footer>
            <div className={cx('footer')}>
                <ShareMoments />

                <div className={cx('footerCenter')}>
                    <div className={cx('footerLeft')}>
                        <div className={cx('info')}>
                            <h3>Thông tin về Nhà</h3>
                            <ul className={cx('list')}>
                                <li>
                                    <Link to="#">LIÊN HỆ</Link>
                                </li>
                                <li>
                                    <Link to="#">TUYỂN DỤNG</Link>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('product')}>
                            <h3>Sản phẩm</h3>
                            <ul className={cx('list')}>
                                {productCategories.map((productCategory, index) => {
                                    return (
                                        <li key={index}>
                                            <Link to={productCategory.link}>
                                                {productCategory.nameVi.toUpperCase()} -{' '}
                                                {productCategory.nameEn.toLowerCase()}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className={cx('policy')}>
                            <h3>Chính sách</h3>
                            <ul className={cx('list')}>
                                <li>
                                    <Link to="#">Chính sách và qui định</Link>
                                </li>
                                <li>
                                    <Link to="#">Bảo mật</Link>
                                </li>
                                <li>
                                    <Link to="#">Liên hệ</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('contact')}>
                        <h3>Liên hệ</h3>
                        <ul className={cx('list')}>
                            <li>
                                Công ty TNHH Kiến trúc và Nội thất Make My Home GPĐKKD số 0314329518 do Sở KHĐT TP.HCM
                                cấp ngày 03/04/2017
                            </li>
                            <li>97-99 Cộng Hoà, lầu 3, phường 4, quận Tân Bình, Hồ Chí Minh</li>
                            <li>ĐT: 028 6267 6466 - ‭0866757758</li>
                            <li>Email: support@makemyhomevn.com</li>
                            <li className={cx('contactDetail')}>
                                <Link to="#">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </Link>
                                <Link to="#">
                                    <i className="fa-brands fa-instagram"></i>
                                </Link>
                                <Link to="#">
                                    <i className="fa-brands fa-pinterest-p"></i>
                                </Link>
                                <Link to="#">
                                    <i className="fa-brands fa-youtube"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <FooterBottom />
            </div>
        </footer>
    );
}

export default Footer;
