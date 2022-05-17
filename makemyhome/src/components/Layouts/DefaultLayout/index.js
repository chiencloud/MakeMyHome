import { createContext, useState } from 'react';
import { Header, Footer } from '~/components/Layouts/components';

const ContextDefault = createContext();

function DefaultLayout({ children }) {

    const carts = JSON.parse(localStorage.getItem('product'))
    const [cartCount, setcountcart] = useState(carts ? carts.length : 0);

    return (
        <div>
            <ContextDefault.Provider value={setcountcart}>
                <Header countCart={cartCount} />
                <div className="container">{children}</div>
                <Footer />
            </ContextDefault.Provider>
        </div>
    );
}

export { ContextDefault };
export default DefaultLayout;
