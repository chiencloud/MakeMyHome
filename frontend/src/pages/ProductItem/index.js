import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';

import { SliderMain } from '~/components/Slider';
import Navigate from '~/components/Navigate';
import Product from '~/components/Product';
import styles from './ProductItem.module.scss';
import { product } from '~/apis';
import addCart from '~/components/Product/addCart';
import { ContextDefault } from '~/components/Layouts/DefaultLayout'

const cx = classNames.bind(styles);

function ProductItem() {
    const { productId } = useParams();
    const setCountCart = useContext(ContextDefault)

    const pro = product.find((p) => p.id === productId);

    const ProductDetail = () => {
        const [imgShow, setImgShow] = useState(pro.imgDemo[0]);
        const [imgChoosed, setImgChoosed] = useState(0);
        const [wareHouse, setWareHouse] = useState(parseInt(pro.wareHouse) > 0 ? 1 : 0);

        function NextArrowVertical(props) {
            let { onClick } = props;

            return (
                <div className={cx('topArrow')}>
                    <span onClick={onClick}>
                        <i className="fa-solid fa-angle-up"></i>
                    </span>
                </div>
            );
        }
        function PrevArrowVertical(props) {
            let { onClick } = props;

            return (
                <div className={cx('bottomArrow')}>
                    <span onClick={onClick}>
                        <i className="fa-solid fa-chevron-down"></i>
                    </span>
                </div>
            );
        }

        const description = useRef();

        useEffect(() => {
            description.current.innerHTML = pro.description;
        });
        const slideShow = pro.imgDemo.length > 4 ? 4 : pro.imgDemo.length;

        const settingSlider = {
            dots: false,
            infinite: true,
            slidesToShow: slideShow,
            slidesToScroll: 4,
            vertical: true,
            verticalSwiping: true,
            nextArrow: <NextArrowVertical />,
            prevArrow: <PrevArrowVertical />,
        };

        const tachMang = (price) => {
            let a = '',
                b = 0;
            for (let i = price.length - 1; i >= 0; i--) {
                b++;
                if (b === 3 && i !== 0) {
                    a = ',' + price[i] + a;
                    b = 0;
                    continue;
                }
                a = price[i] + a;
            }
            return a;
        };

        return (
            <div className={cx('product_detail')}>
                <div className={cx('product_detail_left')}>
                    <div className={cx('product_ImgShow')}>
                        <img src={imgShow} alt="" />
                    </div>
                    <div className={cx('product_SliderImg')}>
                        <Slider {...settingSlider}>
                            {pro.imgDemo.map((img, index) => {
                                return (
                                    <img
                                        key={index}
                                        className={index === imgChoosed ? cx('borderImg') : ''}
                                        src={img}
                                        alt=""
                                        onClick={(e) => {
                                            setImgShow(e.target.src);
                                            setImgChoosed(index);
                                        }}
                                    />
                                );
                            })}
                        </Slider>
                    </div>
                </div>
                <div className={cx('product_detail_right')}>
                    <h2>{pro.productName}</h2>
                    <div className={cx('product_detail_productDescription')}>
                        <p>{pro.productDescription}</p>
                    </div>
                    <div className={cx('product_detail_price')}>
                        <span>
                            {pro.priceDiscount !== '' ? tachMang(pro.priceDiscount) + 'đ' : tachMang(pro.price) + 'đ'}
                        </span>
                        <del>{pro.priceDiscount !== '' ? tachMang(pro.price) + 'đ' : ''}</del>
                    </div>
                    <div ref={description} className={cx('product_detail_description')}></div>
                    <div className={cx('product_detail_wareHoure')}>
                        <p>Số lượng</p>
                        <span>
                            <span
                                onClick={() => {
                                    if (wareHouse > 1) {
                                        setWareHouse((prev) => prev - 1);
                                    }
                                }}
                            >
                                -
                            </span>{' '}
                            <span>{wareHouse}</span>{' '}
                            <span
                                onClick={() => {
                                    if (wareHouse < parseInt(pro.wareHouse)) {
                                        setWareHouse((prev) => prev + 1);
                                    }
                                }}
                            >
                                +
                            </span>
                        </span>
                    </div>

                    <button
                        className={cx('cart')}
                        onClick={() => {
                            addCart({
                                name: 'product',
                                value: {
                                    id: pro.id,
                                    img: pro.imgMain,
                                    name: pro.productName,
                                    price: pro.price,
                                    count: wareHouse
                                }
                            }, setCountCart);
                        }}
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        );
    };

    const SimilarProduct = () => {
        const settingsUpdate = {
            dots: false,
            infinite: true,
            speed: 1200,
            autoplay: false,
            slidesToShow: 4,
            slidesToScroll: 4,
        };
        return (
            <div className={cx('similarProduct')}>
                <div className={cx('similarTitle')}>
                    <h4>Sản phẩm tương tự</h4>
                </div>

                <SliderMain settingsUpdate={settingsUpdate}>
                    {product.map((pro1, index) => {
                        return (
                            <div key={index}>
                                <Product productInfo={pro1} />
                            </div>
                        );
                    })}
                </SliderMain>
            </div>
        );
    };

    return (
        <div>
            <Navigate parent={[]} current={{ name: pro.productName }} />
            <ProductDetail />
            <SimilarProduct />
        </div>
    );
}

export default ProductItem;
