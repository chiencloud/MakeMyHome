import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { ListProduct } from '~/components/Layouts';
import { SliderMain } from '~/components/Slider';
import Product from '~/components/Product';
import styles from './Products.module.scss';
import { productCategories, product } from '~/apis';
import { shuffleArray } from '~/general';

const cx = classNames.bind(styles);

function Products() {

    shuffleArray(product);

    const Banner = () => {
        return (
            <div className={cx('banner')}>
                <img
                    src="https://res.cloudinary.com/dseuvenfm/image/upload/v1652106912/MakeMyHome/Home/bannerProduct_drehs7.png"
                    alt=""
                />
            </div>
        );
    };

    const GroupProduct = () => {
        return (
            <div className={cx('groupProduct')}>
                <h4>Nhóm sản phẩm</h4>

                <div className={cx('groupProductItems')}>
                    {productCategories.map((productCategory, index) => {
                        if (index < 12) {
                            return (
                                <div key={index} className={cx('groupProductItem')}>
                                    <Link to={productCategory.link}>
                                        <img src={productCategory.img} alt={productCategory.nameVi} />
                                        <h3>
                                            {productCategory.nameVi.toUpperCase()} -{' '}
                                            {productCategory.nameEn.toLowerCase()}
                                        </h3>
                                    </Link>
                                </div>
                            );
                        }
                        return undefined;
                    })}
                </div>
            </div>
        );
    };

    const Content = () => {
        function PrevArrow(props) {
            return <div style={{ display: 'none' }}></div>;
        }

        const settingsUpdate = {
            dots: false,
            infinite: true,
            speed: 1200,
            autoplay: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: <PrevArrow />,
        };

        return (
            <div className={cx('productContent')}>
                <SliderMain settingsUpdate={settingsUpdate} arrowInside>
                    <div className={cx('productContentOne')}>
                        <div className={cx('productContentOneLeft')}>
                            <img src="https://theme.hstatic.net/1000280685/1000722794/14/img_banner_new_category.jpg?v=637" />
                        </div>
                        <div className={cx('productContentOneRight')}>
                            {product.map((pro, index) => {
                                if (index < 4)
                                    return (
                                        <div key={index} className={cx('productItem')}>
                                            <Product productInfo={pro} />
                                        </div>
                                    );
                                return undefined;
                            })}
                        </div>
                    </div>
                    <div className={cx('productContentTwo')}>
                        {product.map((pro, index) => {
                            if (index >= 4 && index < 12)
                                return (
                                    <div key={index} className={cx('productItemTwo')}>
                                        <Product productInfo={pro} />
                                    </div>
                                );
                            return undefined;
                        })}
                    </div>
                </SliderMain>
            </div>
        );
    };

    const CanDoYouLike = () => {
        const settingsUpdate = {
            dots: false,
            infinite: true,
            speed: 1200,
            autoplay: false,
            slidesToShow: 4,
            slidesToScroll: 4,
        };

        return (
            <div className={cx('groupProduct')}>
                <h4>Có Thể Bạn Cũng Thích</h4>

                <ListProduct settingsUpdate={settingsUpdate} />
            </div>
        );
    };

    return (
        <>
            <div className={cx('container')}>
                <Banner />
                <GroupProduct />
                <Content />
                <CanDoYouLike />
            </div>
        </>
    );
}

export default Products;
