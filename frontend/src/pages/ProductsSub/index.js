import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { ListProduct } from '~/components/Layouts'
import Navigate from '~/components/Navigate'
import styles from './ProductsSub.module.scss'

const cx = classNames.bind(styles);

function ProductsSub(props) {
    const { nameVi, nameEn, img, link, sub } = props;

    const Navigate1 = () => {
        return (
            <Navigate parent={[]} current={{name: nameVi.toUpperCase() + ' - ' + nameEn.toUpperCase()}} />
        )
    };

    const CategorySub = () => {

        return (
            <div className={cx('category')}>
                <div className={cx('title')}>
                    {nameVi.toUpperCase()} - {nameEn.toUpperCase()}
                </div>
                <div className={cx('categorySub')}>
                    {
                        sub.map((s, index) =>{
                            
                            return (
                                <div key={index} className={cx('categoryItem')}>
                                    <Link to={s.link}>
                                        <div className={cx('categoryImg')}>
                                            <img src={s.img} alt=""/>
                                        </div>
                                        <span>{s.name.toUpperCase()}</span>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>

                <div className={cx('imgbackground')}>
                    <img src="https://file.hstatic.net/1000280685/file/mat_cat_pr2_b2d603e6ed4f439db8e68c202ceb75ec.jpg" alt=""/>
                </div>
            </div>
        );
    };

    const ListProducts = () => {

        const settingsUpdate = {
            dots: false,
            infinite: true,
            speed: 1200,
            autoplay: false,
            slidesToShow: 4,
            slidesToScroll: 4
        };

        return (
            <div className={cx('groupProduct')}>
                <ListProduct settingsUpdate={settingsUpdate} />
            </div>
        );
    };

    return (
        <div className={cx('container')}>
            <Navigate1 />
            <CategorySub />
            <ListProducts />
        </div>
    );
}

export default ProductsSub;
