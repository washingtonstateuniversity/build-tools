export default class wsu_bt_aria_expanded {
	constructor(params) {
		this.params = params;
		this.nav_items = null;
		this.nav_items_selector = params.nav_item_selector;

		if (typeof this.nav_items_selector === 'undefined') {
			console.error('Undefined nav_item_selector. Please pass the selector you would like to be expandable.');
		}

		this.nav_items_selector = this.nav_items_selector + '[aria-expanded="true"]';
	}

	init() {
		this.update_items();
		window.addEventListener('resize', this.update_items.bind(this)); // TODO: look into if we need to use something like debounce or at the very least set a timeout
	}

	update_items() {
		// Query nav items
		this.nav_items = document.querySelectorAll(this.nav_items_selector);

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
	}
}
