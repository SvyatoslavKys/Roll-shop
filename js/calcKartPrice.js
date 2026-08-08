function calcCartPrice(cart) {
	'use strict';

	const items = cart || window.RollShopCart.read();
	const total = items.reduce(function (sum, item) {
		return sum + Number(item.price) * Number(item.quantity);
	}, 0);
	const totalPriceElement = document.querySelector('.total-price');

	if (totalPriceElement) {
		totalPriceElement.textContent = total.toLocaleString('pl-PL');
	}

	return total;
}
