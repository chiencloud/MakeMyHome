import { Header, Footer } from '~/components/Layouts/components';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">{children}</div>
            <Footer/>
        </div>
    );
}

export default DefaultLayout;
