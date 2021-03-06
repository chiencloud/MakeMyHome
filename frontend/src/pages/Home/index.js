import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { SliderMain } from '~/components/Slider';
import { bannerHomes, productCategories, concepts } from '~/apis';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const SlideBanner = () => {
        const settingsUpdate = {
            dots: true,
            infinite: true,
            speed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            fade: true,
        };

        return (
            <div className={cx('slide')}>
                <SliderMain settingsUpdate={settingsUpdate} arrowInside>
                    {bannerHomes.map((bannerHome, index) => {
                        return (
                            <div key={index}>
                                <Link to={bannerHome.url}>
                                    <img className={cx('imageBanner')} src={bannerHome.image} alt="" />
                                </Link>
                            </div>
                        );
                    })}
                </SliderMain>
            </div>
        );
    };

    let check = true;

    const SlideCategorySub = () => {
        if (productCategories.length <= 4) {
            check = false;
            return <div></div>;
        }
        return (
            <div className={cx('productCategoryItems2')}>
                {productCategories.map((productCategory, index) => {
                    if (index >= 4 && index < 12) {
                        return (
                            <div key={index} className={cx('productCategoryItem2')}>
                                <Link to={productCategory.link}>
                                    <div className={cx('productCategoryImg2')}>
                                        <img src={productCategory.img} alt={productCategory.nameVi} />
                                    </div>
                                    <div className={cx('productCategoryName2')}>
                                        <p>
                                            {productCategory.nameVi.toUpperCase()} -{' '}
                                            {productCategory.nameEn.toLowerCase()}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        );
                    }
                    return undefined;
                })}
            </div>
        );
    };

    const SlideCategory = () => {
        function PrevArrow(props) {
            return <div style={{ display: 'none' }}></div>;
        }

        const settingsUpdate = {
            dots: false,
            infinite: true,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: <PrevArrow />,
        };

        return (
            <SliderMain settingsUpdate={settingsUpdate} arrowInside>
                <div className={cx('productCategory')}>
                    <div className={cx('productCategory-1')}>
                        <div className={cx('productCategoryImg')}>
                            <Link to={'/products'}>
                                <img src="https://res.cloudinary.com/dseuvenfm/image/upload/v1651836580/MakeMyHome/Home/img_banner_category_yh8e3w.webp" alt=""/>
                            </Link>
                        </div>
                        <div className={cx('productCategory-1-left')}>
                            <div className={cx('productCategoryTitle')}>
                                <h3>Danh m???c s???n ph???m</h3>
                            </div>
                            <div className={cx('productCategoryItems')}>
                                {productCategories.map((productCategory, index) => {
                                    if (index < 4) {
                                        return (
                                            <div key={index} className={cx('productCategoryItem')}>
                                                <Link to={productCategory.link}>
                                                    <div className={cx('productCategoryImg')}>
                                                        <img src={productCategory.img} alt={productCategory.nameVi} />
                                                    </div>
                                                    <div className={cx('productCategoryName')}>
                                                        <p>
                                                            {productCategory.nameVi.toUpperCase()} -{' '}
                                                            {productCategory.nameEn.toLowerCase()}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <SlideCategorySub />
            </SliderMain>
        );
    };

    const Concept = () => {
        const settingsUpdate = {
            dots: false,
            infinite: true,
            speed: 500,
            autoplay: false,
            autoplaySpeed: 3000,
            slidesToShow: 2,
            slidesToScroll: 1,
        };

        const SlideConcept = () => {
            return (
                <SliderMain settingsUpdate={settingsUpdate}>
                    {concepts.map((concept, index) => {
                        return (
                            <div key={index} className={cx('conceptItem')}>
                                <Link to={concept.link}>
                                    <div className={cx('conceptImg')}>
                                        <img src={concept.image} alt=""/>
                                    </div>
                                    <h4>{concept.name}</h4>
                                </Link>
                            </div>
                        );
                    })}
                </SliderMain>
            );
        };

        return (
            <div className={cx('concept')}>
                <div className={cx('conceptContent')}>
                    <div className={cx('conceptTop')}>
                        <div className={cx('conceptTopLeft')}>
                            <h3>
                                <Link to="#">M-Concept - Gi???i ph??p n???i th???t to??n di???n</Link>
                            </h3>
                            <Link to="#">
                                <h4>
                                    Concept l?? g??i s???n ph???m n???i th???t v?? c???i t???o kh??ng gian to??n di???n theo thi???t k??? c??
                                    s???n t??? th????ng hi???u Make My Home
                                </h4>
                                <br />
                                <h4>
                                    Concept by Make My Home s??? mang ?????n nh???ng gi???i ph??p n???i th???t t???i gi???n v???i ????? ???ng
                                    d???ng cao, ph?? h???p v???i nhi???u phong c??ch kh??c nhau, t???o ra kh??ng gian s???ng ti???n nghi,
                                    tho???i m??i v?? gi??p b???n th???c s??? th?? gi??n m???i khi tr??? v??? nh??.
                                </h4>
                            </Link>
                        </div>
                        <div className={cx('conceptTopRight')}>
                            <h3>TR???I NGHI???M GI???I PH??P KH??NG GIAN S???NG M???I C??NG M-CONCEPT</h3>
                            <h4>TI???T KI???M TH???I GIAN</h4>
                            <h4>T???I ??U H??A NG??N S??CH</h4>
                            <h4>?????NH H??NH TH???M M??? CAO</h4>
                        </div>
                    </div>
                    <div className={cx('conceptBottom')}>
                        <SlideConcept />
                    </div>
                </div>
            </div>
        );
    };

    const ConstructionDesign = () => {
        return (
            <div className={cx('constructionDesign')}>
                <div className={cx('constructionDesignLeft')}>
                    <div className={cx('constructionDesignLeft1')}>
                        <Link to="#">
                            <img src="https://res.cloudinary.com/dseuvenfm/image/upload/v1651941504/MakeMyHome/ConstructionDesign/img_banner_5_1_s2a7vq.webp" alt=""/>
                        </Link>
                    </div>
                    <div className={cx('constructionDesignLeft2')}>
                        <Link to="#">
                            <img src="https://res.cloudinary.com/dseuvenfm/image/upload/v1651941512/MakeMyHome/ConstructionDesign/img_banner_5_3_qohdmn.webp" alt=""/>
                        </Link>
                        <Link to="#">
                            <img src="https://res.cloudinary.com/dseuvenfm/image/upload/v1651941504/MakeMyHome/ConstructionDesign/img_banner_5_2_sewu3r.webp" alt=""/>
                        </Link>
                    </div>
                </div>
                <div className={cx('constructionDesignRight')}>
                    <Link to="#">
                        <img src="https://res.cloudinary.com/dseuvenfm/image/upload/v1651941505/MakeMyHome/ConstructionDesign/img_banner_5_4_q7jguy.webp" alt=""/>
                    </Link>
                </div>
            </div>
        );
    };

    const AboutUs = () => {
        return (
            <div className={cx("aboutUs")}>
                <div className={cx("aboutUsLeft")}>
                    <h3>About Us</h3>
                    <div className={cx("aboutUsInfo")}>
                        <p>
                            T???i MAKE MY HOME, t???t c??? s???n ph???m trang tr?? n???i th???t & gi???i ph??p kh??ng gian s???ng kh??ng ch???
                            ????n thu???n tu??n th??? theo ng??n ng??? gi???n l?????c c???a Minimalism, m?? c??n c??n b???ng ???????c t??nh n??ng v??
                            ????? th???m m??? c???n c??.
                        </p>
                        <p>
                            ?????t t???c l?? nhi???u", nh??ng m???i chi ti???t xu???t hi???n tr??n thi???t k??? ?????u l?? m???t s??? ch??m ch??t k???
                            l?????ng v?? ho??n h???o. V?? ???? c??ng ch??nh l?? t??n ch??? ho???t ?????ng c???a MAKE MY HOME. V???i tinh th???n c???u
                            ti???n lu??n c??? g???ng h???t m??nh ????? cung c???p nh???ng s???n ph???m ch???t l?????ng c???ng v???i d???ch v??? th??n thi???n
                            cho kh??ch h??ng, ch??ng t??i hy v???ng c?? th??? chia s??? m???t ni???m tin c??? h???u v???i t???t c??? m???i ng?????i:
                            ???Cu???c s???ng s??? tr??? n??n t???t ?????p h??n khi kh??ng gian s???ng ???????c quan t??m v?? ?????u t?? ????ng m???c.
                        </p>
                    </div>
                </div>
                <div className={cx("aboutUsRight")}>
                    <Link to="#">
                        <img src="https://res.cloudinary.com/dseuvenfm/image/upload/v1651948783/MakeMyHome/AboutUs/img_Aboutus_title_h7wwim.webp" alt=""/>
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div className="container">
            <SlideBanner />
            <SlideCategory />
            <Concept />
            <ConstructionDesign />
            <AboutUs />
        </div>
    );
}

export default Home;
