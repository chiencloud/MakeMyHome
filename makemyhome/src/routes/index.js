import Home from '~/pages/Home';
import Products from '~/pages/Products';
import Concept from '~/pages/Concept';
import ConstructionDesign from '~/pages/ConstructionDesign';
import News from '~/pages/News';
import Endow from '~/pages/Endow';
import Cart from '~/pages/Cart';
import ProductsSub from '~/pages/ProductsSub';
import ProductCategoryIem from '~/pages/ProductCategoryIem';
import ProductItem from '~/pages/ProductItem';
import { productCategories } from '~/apis';

let productsCategoryItem = [];

const productsSub = productCategories.map((category) => {
    const a = category.sub.map((subCategory) => {
        return {
            path: `/products/${category.nameEn}/${subCategory.nameEn}`,
            component: ProductCategoryIem,
            props: {
                parent: category,
                sub: subCategory
            }

        };
    });

    productsCategoryItem = [...productsCategoryItem, ...a]

    return {
        path: `products/${category.nameEn}`,
        component: ProductsSub,
        props: category
    };
});

const publicRoutes = [
    { path: '/', component: Home },
    { path: 'products', component: Products},
    { path: '/concept', component: Concept },
    { path: '/constructiondesign', component: ConstructionDesign },
    { path: '/news', component: News },
    { path: '/endow', component: Endow },
    { path: '/carts', component: Cart },
    ...productsSub,
    ...productsCategoryItem,
    { path: '/product/:productId', component: ProductItem }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
