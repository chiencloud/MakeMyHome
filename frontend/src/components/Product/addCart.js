import { product } from '~/apis'

function addCart({ name, value }, setCountCart) {
    const productCheck = product.find( pro => pro.id === value.id )
    if(productCheck.wareHouse === '0') {
        alert('Sản phẩm đã hết hàng\n Vui lòng chọn sản phẩm khác')

    }
    else{
        if (localStorage.getItem('product')){
            let prevCart = JSON.parse(localStorage.getItem('product'))
            let pro1 = prevCart.find( p => p.id === value.id )
            if(pro1){
                prevCart = prevCart.map(p => {
                    if(p.id === value.id){
                        alert("Thêm thành công sản phẩm vào giỏ hàng");
                        return {
                            ...p,
                            count: p.count + value.count
                        }
                    }
                    return p
                })
            }
            else{
                prevCart = [...prevCart, value]
                alert("Thêm thành công sản phẩm vào giỏ hàng");
                setCountCart( pre => pre + 1)
            }
            localStorage.setItem('product', JSON.stringify(prevCart));
        }
        else{
            alert("Thêm thành công sản phẩm vào giỏ hàng");
            localStorage.setItem('product', JSON.stringify([value]));
        }
    }

}

export default addCart;
