export default class wsu_bt_aria_expanded {
	constructor(params) {
		this.params = params;
		this.nav_items = null;

		/**
		 *
		 * Assign nav_items_selectors to variable
		 *
		 */
		this.nav_items_selectors = params.nav_item_selectors;

		if (typeof this.nav_items_selectors === 'undefined') {
			console.error('Undefined nav_item_selectors. Please pass the selector you would like to be expandable.');
		}

		/**
		 *
		 * Loop through selectors and append aria target
		 *
		 */
		this.nav_items_selectors.forEach(function (elem, i, arr) {

			arr[i] = elem + '[aria-expanded="true"]';

		}, this.nav_items_selectors);
	}

	init() {
		this.update_items();
		window.addEventListener('resize', this.update_items.bind(this)); // TODO: look into if we need to use something like debounce or at the very least set a timeout
	}

	update_items() {
		this.nav_items_selectors.forEach(elem => {
			// Query nav items
			this.nav_items = document.querySelectorAll(elem);

			// Set collapsible nav items to hidden
			this.nav_items.forEach(nav_item => {
				nav_item.setAttribute('aria-expanded', 'false');
			});

			// Set collapsible nav items to toggle on click
			this.nav_items.forEach(nav_item => {
				nav_item.addEventListener('click', function (e) {
					e.preventDefault;

					if (this.getAttribute('aria-expanded') == 'false') {
						this.setAttribute('aria-expanded', 'true');
					} else {
						this.setAttribute('aria-expanded', 'false');
					}
				});
			});
		});
	}
}
