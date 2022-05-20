import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductCategoryItem.module.scss';

import Product from '~/components/Product';
import Navigate from '~/components/Navigate';
import { shuffleArray } from '~/general';
import { product } from '~/apis';

const cx = classNames.bind(styles);

function ProductCategoryIem(props) {
    const { parent, sub } = props;

    const Menu = () => {
        const parentNavigate = [
            {
                name: parent.nameVi.toUpperCase() + ' - ' + parent.nameEn.toUpperCase(),
                link: parent.link,
            },
        ];

        const currentNavigate = {
            name: sub.name.toUpperCase() + ' - ' + sub.nameEn.toUpperCase(),
        };

        return (
            <div className={cx('menu')}>
                <div className={cx('menuTop')}>
                    <Navigate parent={parentNavigate} current={currentNavigate} />
                    
                </div>
                <div className={cx('menuBottom')}>
                    {parent.sub.map((subItem, index) => {
                        let subItemChose = subItem === sub ? 'subItemChose' : '';

                        return (
                            <p key={index} className={cx('subItem', subItemChose)}>
                                <Link to={subItem.link}>{subItem.name.toUpperCase()}</Link>
                            </p>
                        );
                    })}
                </div>
            </div>
        );
    };

    const Title = () => {
        return (
            <div className={cx('title')}>
                <h2>
                    {sub.name.toUpperCase()} - {sub.nameEn.toUpperCase()}{' '}
                </h2>
            </div>
        );
    };

    shuffleArray(product);
    const ListProduct = () => {
        const initProductCount = product.length > 20 ? 20 : product.length;

        const [count, setCount] = useState(initProductCount);
        const [productsList, setProductList] = useState(product);
        const [selection, setSelection] = useState({
            price: [],
            color: [],
            type: [],
            sort: '',
        });

        const seeMore = () => {
            setCount((countPrev) => {
                if (countPrev + 10 <= productsList.length) {
                    return countPrev + 10;
                }
                return productsList.length;
            });
        };

        const handleSelect = (value, check, type) => {
            setSelection((prev) => {
                switch (type) {
                    case 'price':
                        if (check)
                            return {
                                price: [...prev.price, value],
                                color: [...prev.color],
                                type: [...prev.type],
                                sort: prev.sort,
                            };
                        return {
                            price: prev.price.filter((price) => {
                                return price !== value;
                            }),
                            color: [...prev.color],
                            type: [...prev.type],
                            sort: prev.sort,
                        };
                    case 'color':
                        if (check)
                            return {
                                price: [...prev.price],
                                color: [...prev.color, value],
                                type: [...prev.type],
                                sort: prev.sort,
                            };
                        return {
                            price: [...prev.price],
                            color: prev.color.filter((color) => {
                                return color !== value;
                            }),
                            type: [...prev.type],
                            sort: prev.sort,
                        };
                    case 'type':
                        if (check)
                            return {
                                price: [...prev.price],
                                color: [...prev.color],
                                type: [...prev.type, value],
                                sort: prev.sort,
                            };
                        return {
                            price: [...prev.price],
                            color: [...prev.color],
                            type: prev.type.filter((type) => {
                                return type !== value;
                            }),
                            sort: prev.sort,
                        };
                    case 'sort':
                        return {
                            price: [...prev.price],
                            color: [...prev.color],
                            type: [...prev.type],
                            sort: value,
                        };
                    default:
                        return {
                            price: [],
                            color: [],
                            type: [],
                            sort: '',
                        };
                }
            });
        };

        useEffect(() => {
            setProductList((productPrev) => {
                let select = selection;
                const { price, color, type, sort } = select;
                let productPriceSort = [];

                if (select.price.length > 0) {
                    let price1, price2, price3, price4, price5;
                    price1 = product.filter((pro) => {
                        if (pro.priceDiscount) {
                            return parseFloat(pro.priceDiscount) < 1000000;
                        }
                        return parseFloat(pro.price) < 1000000;
                    });
                    price2 = product.filter((pro) => {
                        if (pro.priceDiscount) {
                            return parseFloat(pro.priceDiscount) >= 1000000 && parseFloat(pro.priceDiscount) < 2000000;
                        }
                        return parseFloat(pro.price) >= 1000000 && parseFloat(pro.price) < 2000000;
                    });
                    price3 = product.filter((pro) => {
                        if (pro.priceDiscount) {
                            return parseFloat(pro.priceDiscount) >= 2000000 && parseFloat(pro.priceDiscount) < 3000000;
                        }
                        return parseFloat(pro.price) >= 2000000 && parseFloat(pro.price) < 3000000;
                    });
                    price4 = product.filter((pro) => {
                        if (pro.priceDiscount) {
                            return parseFloat(pro.priceDiscount) >= 3000000 && parseFloat(pro.priceDiscount) < 5000000;
                        }
                        return parseFloat(pro.price) >= 3000000 && parseFloat(pro.price) < 5000000;
                    });
                    price5 = product.filter((pro) => {
                        if (pro.priceDiscount) {
                            return parseFloat(pro.priceDiscount) > 5000000;
                        }
                        return parseFloat(pro.price) > 5000000;
                    });

                    for (let i = 0; i < price.length; i++) {
                        if (price[i] === 'lowwer1') productPriceSort = [...productPriceSort, ...price1];
                        if (price[i] === '1to2') productPriceSort = [...productPriceSort, ...price2];
                        if (price[i] === '2to3') productPriceSort = [...productPriceSort, ...price3];
                        if (price[i] === '3to5') productPriceSort = [...productPriceSort, ...price4];
                        if (price[i] === 'upper5') productPriceSort = [...productPriceSort, ...price5];
                    }
                }

                if (productPriceSort.length === 0) productPriceSort = [...product];

                if (sort !== '') {
                    if (sort === 'up') {
                        productPriceSort = productPriceSort.sort((proPrev, proNext) => {
                            const discountPrev = proPrev.priceDiscount === '' ? 0 : parseFloat(proPrev.priceDiscount);
                            const discountNext = proNext.priceDiscount === '' ? 0 : parseFloat(proNext.priceDiscount);
                            const pricePrev = parseFloat(proPrev.price);
                            const priceNext = parseFloat(proNext.price);
                            let checkPrev = discountPrev === 0 ? pricePrev : discountPrev;
                            let checkNext = discountNext === 0 ? priceNext : discountNext;

                            return checkPrev - checkNext;
                        });
                    } else if (sort === 'down') {
                        productPriceSort = productPriceSort.sort((proPrev, proNext) => {
                            const discountPrev = proPrev.priceDiscount === '' ? 0 : parseFloat(proPrev.priceDiscount);
                            const discountNext = proNext.priceDiscount === '' ? 0 : parseFloat(proNext.priceDiscount);
                            const pricePrev = parseFloat(proPrev.price);
                            const priceNext = parseFloat(proNext.price);

                            let checkPrev = discountPrev === 0 ? pricePrev : discountPrev;
                            let checkNext = discountNext === 0 ? priceNext : discountNext;

                            return checkNext - checkPrev;
                        });
                    }
                }

                if (productPriceSort.length > 20) {
                    setCount(20);
                } else {
                    setCount(productPriceSort.length);
                }

                return productPriceSort;
            });
        }, [selection]);

        return (
            <div className={cx('products')}>
                <div className={cx('customSort')}>
                    <div className={cx('customSortLeft')}>
                        <div className={cx('customSortPrice')}>
                            <div className={cx('customSortPrice1')}>
                                <p>Giá</p>
                                <i className="fa-solid fa-caret-down"></i>
                            </div>
                            <div className={cx('customSortPrice2')}>
                                <div className={cx('customSortPrice3')}>
                                    <p>
                                        <input
                                            onChange={(e) => {
                                                handleSelect(e.target.value, e.target.checked, 'price');
                                            }}
                                            id="lowwer1"
                                            value="lowwer1"
                                            type="checkbox"
                                        />
                                        &ensp;<label htmlFor="lowwer1">Dưới 1 triệu</label>
                                    </p>
                                    <p>
                                        <input
                                            onChange={(e) => {
                                                handleSelect(e.target.value, e.target.checked, 'price');
                                            }}
                                            id="1to2"
                                            value="1to2"
                                            type="checkbox"
                                        />
                                        &ensp;<label htmlFor="1to2">Từ 1 - 2 triệu</label>
                                    </p>
                                    <p>
                                        <input
                                            onChange={(e) => {
                                                handleSelect(e.target.value, e.target.checked, 'price');
                                            }}
                                            id="2to3"
                                            value="2to3"
                                            type="checkbox"
                                        />
                                        &ensp;<label htmlFor="2to3">Từ 2 - 3 triệu</label>
                                    </p>
                                    <p>
                                        <input
                                            onChange={(e) => {
                                                handleSelect(e.target.value, e.target.checked, 'price');
                                            }}
                                            id="3to5"
                                            value="3to5"
                                            type="checkbox"
                                        />
                                        &ensp;<label htmlFor="3to5">Từ 3 - 5 triệu</label>
                                    </p>
                                    <p>
                                        <input
                                            onChange={(e) => {
                                                handleSelect(e.target.value, e.target.checked, 'price');
                                            }}
                                            id="upper5"
                                            value="upper5"
                                            type="checkbox"
                                        />
                                        &ensp;<label htmlFor="upper5">Lớn hơn 5 triệu</label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('customSortColor')}>
                            <div className={cx('customSortColor1')}>
                                <p>Màu sắc</p>
                                <i className="fa-solid fa-caret-down"></i>
                            </div>
                            <div className={cx('customSortColor2')}>
                                <div className={cx('customSortColor3')}>
                                    <p>
                                        <input
                                            onChange={(e) => {
                                                handleSelect(e.target.value, e.target.checked, 'color');
                                            }}
                                            id="xanh"
                                            value="xanh"
                                            type="checkbox"
                                        />
                                        &ensp;<label htmlFor="xanh">Xanh</label>
                                    </p>
                                    <p>
                                        <input
                                            onChange={(e) => {
                                                handleSelect(e.target.value, e.target.checked, 'color');
                                            }}
                                            id="nau"
                                            value="nau"
                                            type="checkbox"
                                        />
                                        &ensp;<label htmlFor="nau">Nâu</label>
                                    </p>
                                    <p>
                                        <input
                                            onChange={(e) => {
                                                handleSelect(e.target.value, e.target.checked, 'color');
                                            }}
                                            id="trang"
                                            value="trang"
                                            type="checkbox"
                                        />
                                        &ensp;<label htmlFor="trang">Trắng</label>
                                    </p>
                                    <p>
                                        <input
                                            onChange={(e) => {
                                                handleSelect(e.target.value, e.target.checked, 'color');
                                            }}
                                            id="xam"
                                            value="xam"
                                            type="checkbox"
                                        />
                                        &ensp;<label htmlFor="xam">Xám</label>
                                    </p>
                                    <p>
                                        <input
                                            onChange={(e) => {
                                                handleSelect(e.target.value, e.target.checked, 'color');
                                            }}
                                            id="do"
                                            value="do"
                                            type="checkbox"
                                        />
                                        &ensp;<label htmlFor="do">Đỏ</label>
                                    </p>
                                    <p>
                                        <input
                                            onChange={(e) => {
                                                handleSelect(e.target.value, e.target.checked, 'color');
                                            }}
                                            id="den"
                                            value="den"
                                            type="checkbox"
                                        />
                                        &ensp;<label htmlFor="den">Đen</label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('customSortType')}>
                            <div className={cx('customSortType1')}>
                                <p>Loại sản phẩm</p>
                                <i className="fa-solid fa-caret-down"></i>
                            </div>
                            <div className={cx('customSortType2')}>
                                <div className={cx('customSortType3')}>
                                    <p>
                                        <input
                                            onChange={(e) => {
                                                handleSelect(e.target.value, e.target.checked, 'type');
                                            }}
                                            id="khac"
                                            value="khac"
                                            type="checkbox"
                                        />
                                        &ensp;<label htmlFor="khac">Khác</label>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('customSortRight')}>
                        <span>{productsList.length} sản phẩm</span>
                        <select onChange={(e) => handleSelect(e.target.value, true, 'sort')}>
                            <option value="">Sort by</option>
                            <option value="up">Giá: Tăng dần</option>
                            <option value="down">Giá: Giảm dần</option>
                            <option value="az">Tên: A - Z</option>
                            <option value="za">Tên: Z - A</option>
                        </select>
                    </div>
                </div>

                <div className={cx('productList')}>
                    {productsList.slice(0, count).map((product, index) => {
                        return (
                            <div key={index} className={cx('product')}>
                                <Product productInfo={product} />
                            </div>
                        );
                    })}
                </div>

                <div className={cx('seeMore')}>
                    {count !== productsList.length && <span onClick={seeMore}>Xem thêm</span>}
                </div>
            </div>
        );
    };

    return (
        <div className={cx('container')}>
            <Menu />
            <Title />
            <ListProduct />
        </div>
    );
}

export default ProductCategoryIem;
