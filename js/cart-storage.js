(function () {
	'use strict';

	const storageKey = 'roll-shop-cart-pln';

	function readCart() {
		try {
			const savedCart = JSON.parse(localStorage.getItem(storageKey));

			if (!Array.isArray(savedCart)) {
				return [];
			}

			return savedCart.filter(function (item) {
				return item && item.id && Number(item.quantity) > 0 && Number(item.price) >= 0;
			});
		} catch (error) {
			return [];
		}
	}

	function updateCartCount(cart) {
		const items = cart || readCart();
		const count = items.reduce(function (sum, item) {
			return sum + Number(item.quantity);
		}, 0);

		document.querySelectorAll('[data-cart-count]').forEach(function (badge) {
			badge.textContent = count;
		});
	}

	function saveCart(cart) {
		try {
			localStorage.setItem(storageKey, JSON.stringify(cart));
		} catch (error) {
			// The page remains usable when browser storage is unavailable.
		}

		updateCartCount(cart);
	}

	function clearCart() {
		saveCart([]);
	}

	window.RollShopCart = {
		read: readCart,
		save: saveCart,
		clear: clearCart,
		updateCount: updateCartCount
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () {
			updateCartCount();
		});
	} else {
		updateCartCount();
	}
})();
