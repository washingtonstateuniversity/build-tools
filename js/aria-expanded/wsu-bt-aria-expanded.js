
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
		 * Assign nav_name to variable
		 *
		 */
		this.nav_name = params.nav_name;

		if (typeof this.nav_name === 'undefined') {
			console.error('Undefined nav_name. Please pass a unique name of the element you are creating.');
		}

		/**
		 *
		 * Assign use_animations to variable
		 *
		 */
		this.use_animations = params.use_animations;

		if (typeof this.use_animations === 'undefined') {
			this.use_animations = false;
		}

		/**
		 *
		 * Loop through selectors and append aria target
		 *
		 */
		if (Array.isArray(this.nav_items_selectors)) {
			this.nav_items_selectors.forEach(function (elem, i, arr) {

				arr[i] = elem + '[aria-expanded="true"]';

			}, this.nav_items_selectors);
		} else {
			this.nav_items_selectors = this.nav_items_selectors + '[aria-expanded="true"]';
		}
	}

	init() {
		this.update_items();
		window.addEventListener('resize', this.update_items.bind(this)); // TODO: look into if we need to use something like debounce or at the very least set a timeout
	}

	update_items() {
		// Update items if is an array of items
		if (Array.isArray(this.nav_items_selectors)) {
			this.nav_items_selectors.forEach(element => {
				this.control_attribute_state(element);
			});
		} else {
			this.control_attribute_state(this.nav_items_selectors);
		}
	}

	control_attribute_state(element) {
		// Query nav items
		this.nav_items = document.querySelectorAll(element);

		// Set collapsible nav items to hidden
		this.nav_items.forEach(nav_item => {
			nav_item.setAttribute('aria-expanded', 'false');
		});

		// Set collapsible nav items to toggle on click
		this.nav_items.forEach(nav_item => {
			const _this = this;

			nav_item.addEventListener('click', function (e) {
				e.preventDefault;

				if (this.getAttribute('aria-expanded') == 'false') {
					this.setAttribute('aria-expanded', 'true');

					if (_this.use_animations) {
						_this.animate_elements_in(e);
					}
				} else {
					this.setAttribute('aria-expanded', 'false');

					if (_this.use_animations) {
						_this.animate_elements_out(e);
					}
				}
			});
		});
	}

	animate_elements_in(event) {
		event.currentTarget.nextElementSibling.classList.add('animated', 'fadeInUp');

		const sub_nav_items = event.currentTarget.nextElementSibling.children;
		const sub_nav_items_count = sub_nav_items.length;

		for (var i = 0; i < sub_nav_items_count; i++) {
			(function (i) {

				const duration = 30; // Duration between each item being animated
				const curve = 0.25; // Increment intensity

				// let increment = duration + (duration * (i * curve)); // Linear
				let increment = duration + (duration * (i * (i * curve))); // Bezier

				setTimeout(function () {
					sub_nav_items[i].classList.add('animated', 'fadeInUp');
				}, increment);
			})(i);
		}
	}

	animate_elements_out(event) {

	}
}
