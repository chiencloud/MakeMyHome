import classNames from 'classnames/bind';
import SliderWrapper from './SliderWrapper';
import Slider from 'react-slick';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

function SliderMain({ children, settingsUpdate, arrowInside, arrowVertical }) {
    function NextArrow(props) {
        let { onClick } = props;

        return (
            <div className={cx('nextArrowMain')}>
                <span onClick={onClick}>
                    <i className="fa-solid fa-angle-right"></i>
                </span>
            </div>
        );
    }
    function PrevArrow(props) {
        let { onClick } = props;

        return (
            <div className={cx('prevArrowMain')}>
                <span onClick={onClick}>
                    <i className="fa-solid fa-angle-left"></i>
                </span>
            </div>
        );
    }

    function NextArrowVertical(props) {
        let { onClick } = props;

        return (
            <div className={cx('top')}>
                <span onClick={onClick}>
                    <i className="fa-solid fa-angle-up"></i>
                </span>
            </div>
        );
    }
    function PrevArrowVertical(props) {
        let { onClick } = props;

        return (
            <div className={cx('bottom')}>
                <span onClick={onClick}>
                    <i className="fa-solid fa-chevron-down"></i>
                </span>
            </div>
        );
    }

    const PrevArrowOutSide = (props) => {
        return (
            <div className={cx('prevArrowShareMoment')}>
                <span onClick={props.onClick}>
                    <i className="fa-solid fa-angle-left"></i>
                </span>
            </div>
        );
    };

    const NextArrowOutSide = (props) => {
        return (
            <div className={cx('nextArrowShareMoment')}>
                <span onClick={props.onClick}>
                    <i className="fa-solid fa-angle-right"></i>
                </span>
            </div>
        );
    };

    let settings = {
        adaptiveHeight: true,
    };

    if (arrowInside) {
        settings = { ...settings, nextArrow: <NextArrow />, prevArrow: <PrevArrow /> };
    } else {
        settings = { ...settings, nextArrow: <NextArrowOutSide />, prevArrow: <PrevArrowOutSide /> };
    }

    if (arrowVertical) {
        settings = { ...settings, nextArrow: <NextArrowVertical />, prevArrow: <PrevArrowVertical /> };
    }
    if (settingsUpdate) settings = { ...settings, ...settingsUpdate };

    return (
        <div>
            <SliderWrapper>
                <Slider {...settings}>{children}</Slider>
            </SliderWrapper>
        </div>
    );
}

export { SliderMain };
