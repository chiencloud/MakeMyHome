import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { ContextDefault } from '~/components/Layouts/DefaultLayout';
import { product } from '~/apis';
import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function Carts() {
    const [carts, setCarts] = useState([]);
    const setCountCart = useContext(ContextDefault);

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

    const handleAddCount = (id) => {
        return setCarts((prev) => {
            let a = prev.map((cart) => {
                if (cart.id === id) {
                    if (cart.count < cart.wareHouse)
                        return {
                            ...cart,
                            count: cart.count + 1,
                        };
                    else alert(`Kho hàng chỉ còn ${cart.wareHouse} sản phẩm`);
                }
                return cart;
            });
            localStorage.setItem('product', JSON.stringify(a));
            return a;
        });
    };

    const handleDeleteCount = (id) => {
        return setCarts((prev) => {
            let a = prev.map((cart) => {
                if (cart.id === id) {
                    if (cart.count > 0)
                        return {
                            ...cart,
                            count: cart.count - 1,
                        };
                    else if (cart.count === '0') {
                        alert('Hết hàng');
                    } else {
                        alert(`Tối thiểu phải là 1 sản phẩm`);
                    }
                }
                return cart;
            });
            localStorage.setItem('product', JSON.stringify(a));
            return a;
        });
    };

    const removeCart = (id) => {
        setCountCart((pre) => {
            return pre - 1;
        });
        return setCarts((prev) => {
            let a = prev.filter((cart) => cart.id !== id);
            localStorage.setItem('product', JSON.stringify(a));
            return a;
        });
    };

    useEffect(() => {
        setCarts(() => {
            let carts1 = JSON.parse(localStorage.getItem('product'));
            carts1 = carts1.map((cart) => {
                let prod = product.find((pro) => pro.id === cart.id);
                let count;
                if (cart.count > prod.wareHouse) {
                    count = prod.wareHouse;
                } else count = cart.count;

                return {
                    id: prod.id,
                    img: prod.imgMain,
                    name: prod.productName,
                    price: prod.price,
                    count: cart.count >= prod.wareHouse ? prod.wareHouse : cart.count,
                    wareHouse: prod.wareHouse,
                };
            });
            localStorage.setItem('product', JSON.stringify(carts1));
            return carts1;
        });
    }, []);

    const OutStock = () => {
        return <span className={cx('outStock')}> Hết hàng </span>;
    };

    const Table = () => {
        return (
            <>
                <table className="">
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}></th>
                            <th style={{ width: '50%' }}>Product</th>
                            <th style={{ width: '15%' }}>Giá</th>
                            <th style={{ width: '15%' }}>Số lượng</th>
                            <th style={{ width: '15%' }}>Tất cả</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.map((cart, index) => {
                            let outOfStock;
                            if (cart.count === '0') outOfStock = 'outOfStock';
                            return (
                                <tr
                                    key={cart.id}
                                    style={
                                        index !== carts.length - 1
                                            ? { borderBottom: '1px solid rgb(204, 204, 204)' }
                                            : {}
                                    }
                                    className={cx(outOfStock)}
                                >
                                    <td>
                                        <i className="fa-solid fa-xmark" onClick={() => removeCart(cart.id)}></i>
                                    </td>
                                    <td className={cx('info')}>
                                        <Link to={'/product/' + cart.id}>
                                            <img src={cart.img} />
                                            <h4>{cart.name}</h4>
                                        </Link>
                                        {cart.wareHouse === '0' && <OutStock />}
                                    </td>
                                    <td className={cx('bold')}>{tachMang(cart.price)}đ</td>
                                    <td>
                                        <span>
                                            <span onClick={() => handleDeleteCount(cart.id)}> - </span>
                                            &emsp;<span className={cx('count')}>{cart.count}</span>&emsp;
                                            <span onClick={() => handleAddCount(cart.id)}> + </span>
                                        </span>
                                    </td>
                                    <td className={cx('bold')}>
                                        {tachMang((parseFloat(cart.price) * parseInt(cart.count)).toString())}đ
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className={cx('note_total')}>
                    <div className={cx('note')}>
                        <p>Ghi chú đơn hàng</p>
                        <textarea></textarea>
                    </div>
                    <div className={cx('total')}>
                        <div className={cx('totalMain')}>
                            <span className={cx('title')}>
                                Tất cả
                                <span className={cx('priceTotal')}>
                                    {
                                        tachMang(carts.reduce((prev, current) => {
                                            return prev + parseFloat(current.price)*parseFloat(current.count);
                                        }, 0).toString())
                                    }
                                </span>
                            </span>
                            <p>(Chưa bao gồm phí vận chuyển)</p>
                        </div>
                        <div>
                            <Link to="/products">« Tiếp tục mua sắm</Link>
                            <button>THANH TOÁN</button>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const NoneCart = () => {
        return (
            <div>
                <p>
                    Giỏ hàng của bạn hiện đang trống.
                    <Link to="/products">Tiếp tục mua sắm</Link>
                </p>
            </div>
        );
    };

    return (
        <div className={cx('cart')}>
            <h2>Giỏ hàng</h2>
            {carts.length > 0 ? <Table /> : <NoneCart />}
        </div>
    );
}

export default Carts;
