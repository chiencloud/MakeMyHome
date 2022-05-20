import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { ContextDefault } from '~/components/Layouts/DefaultLayout';
import addCart from './addCart';
import styles from './Product.module.scss';

const cx = classNames.bind(styles);

function Product({ productInfo }) {
    let { id, imgMain, imgHover, productName, productDescription, price, priceDiscount } = productInfo;
    const setCountCart = useContext(ContextDefault)

    const tachMang = (price) => {
        let a = '',
            b = 0;
        for (let i = price.length - 1; i >= 0; i--) {
            b++;
            if (b === 3 && i != 0) {
                a = ',' + price[i] + a;
                b = 0;
                continue;
            }
            a = price[i] + a;
        }
        return a;
    };

    price = tachMang(price);
    priceDiscount = tachMang(priceDiscount);

    const Discount = () => {
        let percentDiscount;
        if (priceDiscount) {
            percentDiscount = parseInt(((parseFloat(price) - parseFloat(priceDiscount)) / parseFloat(price)) * 100);

            return (
                <div className={cx('discount')}>
                    {percentDiscount < 0 ? '+' : '-'}
                    {Math.abs(percentDiscount)}%
                </div>
            );
        }
        return <div></div>;
    };

    return (
        <div className={cx('product')}>
            <div className={cx('product1')}>
                <div className={cx('productImg')}>
                    <Link to={`/product/` + id}>
                        <img src={imgMain} alt="" />
                    </Link>
                </div>
                <div className={cx('productHover')}>
                    <Link to={`/product/` + id}>
                        <img src={imgHover} />
                    </Link>
                    <div className={cx('productCart')}>
                        <i
                            className="fa-solid fa-cart-plus"
                            onClick={() => {
                                addCart({
                                    name: 'product',
                                    value: {
                                        id: id,
                                        img: imgMain,
                                        name: productName,
                                        price: price,
                                        count: 1
                                    }
                                }, setCountCart);
                            }}
                        ></i>
                    </div>
                </div>
                <Discount />
                <div className={cx('productInfo')}>
                    <div className={cx('productName')}>
                        <h2>
                            <Link to={`/product/` + id}>{productName}</Link>
                        </h2>
                    </div>
                    <div className={cx('productDescription')}>{productDescription}</div>
                    <div className={cx('productPrice')}>
                        <span>{priceDiscount ? priceDiscount : price}đ </span>
                        <del>{priceDiscount ? price + 'đ' : ''}</del>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
