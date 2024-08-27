function calcCartPrice() {
    const cartItems = document.querySelectorAll('.cart-item');
    console.log('cartItems');

    cartItems.forEach(function (item){

        const amountel = item.querySelector('[data-couner]');
        const priceel = item.querySelector('price__currency');
        const currentPrice = parseInt(amountel.innerText) * parseInt(priceel.innerText);
        console.log(currentPrice);

    })}