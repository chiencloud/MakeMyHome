import styled from '@emotion/styled'

const SliderWrapper = styled("div")`
    .slick-dots{
        bottom: 25px;
    }

    .slick-dots li button::before{
        background-color: #000;
        border-radius: 5px;
        height: 10px;
        content: "";
        width: 25px;
        box-shadow: 0 3px 6px #fff;
    }
`

export default SliderWrapper