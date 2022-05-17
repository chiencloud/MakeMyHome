import classNames from 'classnames/bind'

import Product from '~/components/Product'
import { shuffleArray } from '~/general'
import styles from './ListProduct.module.scss'
import { SliderMain } from '~/components/Slider'
import { product } from '~/apis'

const cx = classNames.bind(styles)


function ListProduct( {settingsUpdate} ) {
    shuffleArray(product)

    return (
        <div className={cx('groupProduct')}>

            <SliderMain settingsUpdate={settingsUpdate}>
                {product.map((pro,index) => {
                    return (
                        <div key={index} className={cx('groupProductItem')}>
                            <Product productInfo={pro}/>
                        </div>
                    );
                    
                })}
            </SliderMain>
        </div>
    );
}

export default ListProduct