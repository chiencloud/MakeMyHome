import classNames from 'classnames/bind';
import SliderWrapper from './SliderWrapper';
import Slider from 'react-slick';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

function SliderMain({ children, settingsUpdate }) {
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

    let settings = {
        adaptiveHeight: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow style={{ zIndex: '-1' }} />,
    };
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
