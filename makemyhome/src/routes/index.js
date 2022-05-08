import Home from '~/pages/Home'
import Products from '~/pages/Products'
import Concept from '~/pages/Concept'
import ConstructionDesign from '~/pages/ConstructionDesign'
import News from '~/pages/News'
import Endow from '~/pages/Endow'


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/products', component: Products },
    { path: '/concept', component: Concept },
    { path: '/constructiondesign', component: ConstructionDesign },
    { path: '/news', component: News },
    { path: '/endow', component: Endow },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }