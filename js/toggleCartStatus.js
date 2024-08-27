 function  toggleCartStatus() {
    // console.log('toggleCartStatus');
    const cartWraper = document.querySelector('.cart-wrapper');
    // console.log(cartWraper.children.length);
    const cartEmptyBedge = document.querySelector('[data-cart-empty]');
    const orderForm = document.querySelector('[order-form]');
    // console.log('cartWraper.children,lenght')
    if (cartWraper.children.length > 0) {
        // console.log('full');
        cartEmptyBedge.classList.add('none');
        orderForm.classList.remove('none');
    } else {
        // console.log('empty');
        cartEmptyBedge.classList.remove('none');
        orderForm.classList.add('none');
    }
 }