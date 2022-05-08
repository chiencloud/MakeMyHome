import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { productCategories, concepts } from '~/apis';

const cx = classNames.bind(styles);

function Header() {
    const [checkHeader, setCheckHeader] = useState(false);

    const refHeader = useRef();
    const refProductCategory = useRef();

    useEffect(() => {
        function handlePosition() {
            let y = window.pageYOffset;
            let heightHeader = refHeader.current.offsetHeight;
            if (y >= heightHeader) setCheckHeader(true);
            else setCheckHeader(false);
        }

        window.addEventListener('scroll', handlePosition);

        return () => {
            window.removeEventListener('scroll', handlePosition);
        };
    }, []);

    useEffect(() => {
        refProductCategory.current.style.top = (refHeader.current.offsetHeight - 1) + 'px';
    })


    return (
        <header ref={refHeader} className={checkHeader ? cx('positionFixed') : undefined}>
            <div className={cx('header')}>
                <div className={cx('header-top')}>
                    <div className={cx('logo')}>
                        <Link to="/">
                            <img src="https://theme.hstatic.net/1000280685/1000722794/14/logo.png?v=637" alt="Logo" />
                        </Link>
                    </div>
                    <div className={cx('header-top-right')}>
                        <Link to="/cart">
                            <div className={cx('cart')}>
                                <i className="fa-solid fa-cart-shopping cart-icon"></i>
                                <span className={cx('cart-count')}>0</span>
                            </div>
                        </Link>
                        <Link to="/account">
                            <i className="fa-solid fa-user user-icon"></i>
                        </Link>
                        <div className={cx('search')}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" className={cx('search-input')} placeholder="Tìm kiếm sản phẩm..." />
                        </div>
                    </div>
                </div>
                <div className={cx('header-bottom')}>
                    <ul className={cx('category')}>
                        <li>
                            <Link to="/">GIỚI THIỆU</Link>
                        </li>
                        <li>
                            <Link to="/products">
                                SẢN PHẨM
                            </Link>
                            <div ref={refProductCategory} className={cx('productCategory')}>
                                <div className={cx('productCategoryMain')}>
                                    <div className={cx('productCategoryLeft')}>
                                        <ul>
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
                                    <div className={cx('productCategoryRight')}>
                                        <img
                                            src="https://res.cloudinary.com/dseuvenfm/image/upload/v1652004774/MakeMyHome/Home/image_menu_products_g2nn4g.webp"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to="/concept">M.CONCEPT</Link>
                            <div className={cx('concept')}>
                                <ul className={cx("conceptMain")}>
                                    {
                                        concepts.map((concept, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link to={concept.link} >
                                                        {concept.name}
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/constructiondesign">THIẾT KẾ & THI CÔNG</Link>
                        </li>
                        <li>
                            <Link to="/news">TIN TỨC</Link>
                        </li>
                        <li>
                            <Link to="/endow">ƯU ĐÃI</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
