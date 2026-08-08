function toggleCartStatus(cart) {
	'use strict';

	const items = cart || window.RollShopCart.read();
	const cartEmptyBadge = document.querySelector('[data-cart-empty]');
	const cartTotal = document.querySelector('[data-cart-total]');
	const orderForm = document.querySelector('[data-order-form]');
	const hasItems = items.length > 0;

	if (cartEmptyBadge) {
		cartEmptyBadge.classList.toggle('none', hasItems);
	}

	if (orderForm) {
		orderForm.classList.toggle('none', !hasItems);
	}

	if (cartTotal) {
		cartTotal.classList.toggle('none', !hasItems);
	}
}
