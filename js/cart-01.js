
const cartWrapper = document.querySelector('.cart-wrapper')
// отслеживаем клик на странице
window.addEventListener('click', function (event) {
    // проверяем был ли клик по кнопке с атрибутом data-cart
    if (event.target.hasAttribute('data-cart')) {
        // находим родительский атрибут карточки товара 
    const card = event.target.closest('.card');
    
    const productInfo = {

        id: card.dataset.id,
        imgSrc:  card.querySelector('.product-img').getAttribute('src'),
        title: card.querySelector('.item-title').innerText,
        itemsInBox: card.querySelector('[data-items-in-box]').innerText,
        weight: card.querySelector('.price__weight').innerText,
        price: card.querySelector('.price__currency').innerText,
        counter: card.querySelector('[data-counter]').innerText,
    };
    
    // проверка на галичие аналогичного товара в корзине два варианта 
    // cartWrapper.querySelector('[data-id="' + productInfo.id + '"]');
    const itemInCard =  cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
    
    if (itemInCard) {
       const counterElement = itemInCard.querySelector('[data-counter]');
       counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
    } else {

    

    // подставляем в шаблон данные которые были собраны в onst productInfo
    const cardIemHTML = `
    		<div class="cart-item" data-id="${productInfo.id}">
								<div class="cart-item__top">
									<div class="cart-item__img">
										<img src="${productInfo.imgSrc}" alt="">
									</div>
									<div class="cart-item__desc">
										<div class="cart-item__title">${productInfo.title }</div>
										<div class="cart-item__weight">${productInfo.itemsInBox} /${productInfo.weight}</div>

										<!-- cart-item__details -->
										<div class="cart-item__details">

											<div class="items items--small counter-wrapper">
												<div class="items__control" data-action="minus">-</div>
												<div class="items__current" data-counter="">${productInfo.counter}</div>
												<div class="items__control" data-action="plus">+</div>
											</div>

											<div class="price">
												<div class="price__currency">${productInfo.price} $</div>
											</div>

										</div>
										<!-- // cart-item__details -->

									</div>
								</div>
							</div>
							<!-- // Cart item -->

						</div>
    `;
 cartWrapper.insertAdjacentHTML('beforeend', cardIemHTML); 

 
}
// сброс счетчика на 1 после того как товар добавлен в корзину
card.querySelector('[data-counter]').innerText = '1';
toggleCartStatus();


}
});