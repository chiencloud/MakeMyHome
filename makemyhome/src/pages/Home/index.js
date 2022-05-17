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
                                <h3>Danh mục sản phẩm</h3>
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
                                <Link to="#">M-Concept - Giải pháp nội thất toàn diện</Link>
                            </h3>
                            <Link to="#">
                                <h4>
                                    Concept là gói sản phẩm nội thất và cải tạo không gian toàn diện theo thiết kế có
                                    sẵn từ thương hiệu Make My Home
                                </h4>
                                <br />
                                <h4>
                                    Concept by Make My Home sẽ mang đến những giải pháp nội thất tối giản với độ ứng
                                    dụng cao, phù hợp với nhiều phong cách khác nhau, tạo ra không gian sống tiện nghi,
                                    thoải mái và giúp bạn thực sự thư giãn mỗi khi trở về nhà.
                                </h4>
                            </Link>
                        </div>
                        <div className={cx('conceptTopRight')}>
                            <h3>TRẢI NGHIỆM GIẢI PHÁP KHÔNG GIAN SỐNG MỚI CÙNG M-CONCEPT</h3>
                            <h4>TIẾT KIỆM THỜI GIAN</h4>
                            <h4>TỐI ƯU HÓA NGÂN SÁCH</h4>
                            <h4>ĐỊNH HÌNH THẨM MỸ CAO</h4>
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
                            Tại MAKE MY HOME, tất cả sản phẩm trang trí nội thất & giải pháp không gian sống không chỉ
                            đơn thuần tuân thủ theo ngôn ngữ giản lược của Minimalism, mà còn cân bằng được tính năng và
                            độ thẩm mỹ cần có.
                        </p>
                        <p>
                            “Ít tức là nhiều", nhưng mỗi chi tiết xuất hiện trên thiết kế đều là một sự chăm chút kỹ
                            lưỡng và hoàn hảo. Và đó cũng chính là tôn chỉ hoạt động của MAKE MY HOME. Với tinh thần cầu
                            tiến luôn cố gắng hết mình để cung cấp những sản phẩm chất lượng cộng với dịch vụ thân thiện
                            cho khách hàng, chúng tôi hy vọng có thể chia sẻ một niềm tin cố hữu với tất cả mọi người:
                            “Cuộc sống sẽ trở nên tốt đẹp hơn khi không gian sống được quan tâm và đầu tư đúng mực.
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
