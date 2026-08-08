(function () {
	'use strict';

	document.addEventListener('click', function (event) {
		const control = event.target.closest('[data-action]');

		if (!control || control.closest('.cart-wrapper')) {
			return;
		}

		const counterWrapper = control.closest('.counter-wrapper');
		const counter = counterWrapper && counterWrapper.querySelector('[data-counter]');

		if (!counter) {
			return;
		}

		const currentValue = Number(counter.textContent);

		if (control.dataset.action === 'plus') {
			counter.textContent = currentValue + 1;
		}

		if (control.dataset.action === 'minus' && currentValue > 1) {
			counter.textContent = currentValue - 1;
		}
	});
})();
