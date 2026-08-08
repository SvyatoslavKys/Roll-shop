(function () {
	'use strict';

	const cartWrapper = document.querySelector('.cart-wrapper');
	const checkoutForm = document.querySelector('[data-checkout-form]');
	const orderSuccess = document.querySelector('[data-order-success]');

	if (!cartWrapper || !window.RollShopCart) {
		return;
	}

	function escapeHtml(value) {
		return String(value)
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replaceAll('"', '&quot;')
			.replaceAll("'", '&#039;');
	}

	function createCartItem(item) {
		const itemPrice = Number(item.price) * Number(item.quantity);

		return `
			<div class="cart-item" data-id="${escapeHtml(item.id)}">
				<div class="cart-item__top">
					<div class="cart-item__img">
						<img src="${escapeHtml(item.imgSrc)}" alt="${escapeHtml(item.title)}">
					</div>
					<div class="cart-item__desc">
						<div class="cart-item__title">${escapeHtml(item.title)}</div>
						<div class="cart-item__weight">${escapeHtml(item.itemsInBox)} · ${escapeHtml(item.weight)}</div>
						<div class="cart-item__details">
							<div class="items items--small counter-wrapper">
								<button class="items__control" type="button" data-action="minus" aria-label="Decrease quantity">−</button>
								<span class="items__current" data-counter>${Number(item.quantity)}</span>
								<button class="items__control" type="button" data-action="plus" aria-label="Increase quantity">+</button>
							</div>
							<div class="price"><div class="price__currency">${itemPrice.toLocaleString('pl-PL')} zł</div></div>
						</div>
					</div>
				</div>
			</div>`;
	}

	function renderCart() {
		const cart = window.RollShopCart.read();
		cartWrapper.innerHTML = cart.map(createCartItem).join('');
		toggleCartStatus(cart);
		calcCartPrice(cart);
		window.RollShopCart.updateCount(cart);
	}

	function addProductToCart(card) {
		const counter = card.querySelector('[data-counter]');
		const quantity = Number(counter.textContent);
		const cart = window.RollShopCart.read();
		const existingItem = cart.find(function (item) {
			return item.id === card.dataset.id;
		});

		if (existingItem) {
			existingItem.quantity = Number(existingItem.quantity) + quantity;
		} else {
			cart.push({
				id: card.dataset.id,
				imgSrc: card.querySelector('.product-img').getAttribute('src'),
				title: card.querySelector('.item-title').textContent.trim(),
				itemsInBox: card.querySelector('[data-items-in-box]').textContent.trim(),
				weight: card.querySelector('.price__weight').textContent.trim(),
				price: Number(card.dataset.price),
				quantity: quantity
			});
		}

		window.RollShopCart.save(cart);
		counter.textContent = '1';

		if (orderSuccess) {
			orderSuccess.classList.add('none');
		}

		renderCart();
	}

	function changeCartItem(control) {
		const cartItem = control.closest('.cart-item');
		const cart = window.RollShopCart.read();
		const item = cart.find(function (cartProduct) {
			return cartProduct.id === cartItem.dataset.id;
		});

		if (!item) {
			return;
		}

		item.quantity = Number(item.quantity) + (control.dataset.action === 'plus' ? 1 : -1);
		const updatedCart = cart.filter(function (cartProduct) {
			return cartProduct.quantity > 0;
		});

		window.RollShopCart.save(updatedCart);
		renderCart();
	}

	document.addEventListener('click', function (event) {
		const addButton = event.target.closest('[data-cart]');

		if (addButton) {
			addProductToCart(addButton.closest('[data-id]'));
			return;
		}

		const cartControl = event.target.closest('.cart-wrapper [data-action]');

		if (cartControl) {
			changeCartItem(cartControl);
		}
	});

	if (checkoutForm) {
		checkoutForm.addEventListener('submit', function (event) {
			event.preventDefault();

			if (window.RollShopCart.read().length === 0) {
				return;
			}

			window.RollShopCart.clear();
			checkoutForm.reset();
			renderCart();

			if (orderSuccess) {
				orderSuccess.classList.remove('none');
			}
		});
	}

	renderCart();
})();
