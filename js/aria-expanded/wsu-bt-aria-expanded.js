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
		window.addEventListener('resize', this.update_items.bind(this));
		window.addEventListener('click', this.check_for_close.bind(this, event));
	}

	/**
	 * Updates items as needed
	 * @function
	 */
	update_items() {
		if (Array.isArray(this.nav_items_selectors)) {
			this.nav_items_selectors.forEach(element => {
				this.control_attribute_state(element);
			});
		} else {
			this.control_attribute_state(this.nav_items_selectors);
		}
	}

	/**
	 * Controls wether items are expanded true or false
	 * @param {object} element
	 */
	control_attribute_state(element) {

		/*----------  Initial onLoad state  ----------*/
		this.nav_items = document.querySelectorAll(element);

		// Set collapsible nav items to hidden
		this.nav_items.forEach(nav_item => {
			nav_item.setAttribute('aria-expanded', 'false');

			if (this.use_animations) {
				const nav_items = Array.from(nav_item.nextElementSibling.children);

				nav_items.forEach(element => {
					element.classList.add('animated');
				});
			}
		});

		/*----------  onClick behaviors  ----------*/
		const _this = this;
		this.nav_items.forEach(nav_item => {

			// Set collapsible nav items to toggle on click
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
		// Container
		event.currentTarget.nextElementSibling.style.visibility = 'visible';
		event.currentTarget.nextElementSibling.classList.remove('fadeOutDown');
		event.currentTarget.nextElementSibling.classList.add('fadeInUp');

		// Children Items
		const sub_nav_items = event.currentTarget.nextElementSibling.children;
		const sub_nav_items_count = sub_nav_items.length;

		for (var i = 0; i < sub_nav_items_count; i++) {
			(function (i) {

				const duration = 30; // Duration between each item being animated
				const curve = 0.25; // Increment intensity

				// let increment = duration + (duration * (i * curve)); // Linear
				let increment = duration + (duration * (i * (i * curve))); // Bezier

				setTimeout(function () {
					sub_nav_items[i].classList.remove('fadeOutDown');
					sub_nav_items[i].classList.add('fadeInUp');
				}, increment);
			})(i);
		}
	}

	animate_elements_out(event) {
		/**
		 * If event is not a click, assume we aren't dealing with something inside the component (aka a close action)
		 */
		if (event.type !== 'click') {
			const element_to_hide = event.nextElementSibling;

			// Animate container item
			this.animate_item(element_to_hide);

			// Animate children menus out
			this.animate_items(element_to_hide.children);
		} else {
			const element_to_hide = event.currentTarget.nextElementSibling;

			// Animate container item
			this.animate_item(element_to_hide);

			// Animate children menus out
			this.animate_items(element_to_hide.children);

			// Remove container from screen after animation finishes
			setTimeout(function () {
				element_to_hide.style.visibility = 'hidden';
			}, 350);
		}
	}

	animate_item(elements_to_animate, add = 'fadeOutDown', remove = 'fadeInUp', ) {
		elements_to_animate.classList.remove(remove);
		elements_to_animate.classList.add(add);
	}

	animate_items(elements_to_animate, add = 'fadeOutDown', remove = 'fadeInUp', ) {
		const sub_nav_items = elements_to_animate;
		const sub_nav_items_count = sub_nav_items.length;

		for (var i = 0; i < sub_nav_items_count; i++) {
			(function (i) {

				const duration = 30; // Duration between each item being animated
				const curve = 0.25; // Increment intensity

				// let increment = duration + (duration * (i * curve)); // Linear
				let increment = duration + (duration * (i * (i * curve))); // Bezier

				setTimeout(function () {
					sub_nav_items[i].classList.remove(remove);
					sub_nav_items[i].classList.add(add);
				}, increment);
			})(i);
		}
	}

	open_dropdowns() {
		// Set collapsible nav items to hidden
		this.get_nav_items.forEach(nav_item => {
			nav_item.setAttribute('aria-expanded', 'true');

			if (this.use_animations) {
				this.animate_elements_in();
			}
		});
	}

	/**
	 *
	 * Close dropdowns goes through all open nav items and closes them. If animations are enabled, will fade them out.
	 * @function
	 *
	 */
	close_dropdowns() {
		// Set collapsible nav items to hidden
		this.get_nav_items.forEach(nav_item => {
			nav_item.setAttribute('aria-expanded', 'false');

			if (this.use_animations) {
				this.animate_elements_out(nav_item);
			}
		});

		// Remove from screen after animation finishes
		const main_nav_items = this.params['nav_item_selectors'] + '[aria-expanded="false"] + ' + this.params['main_nav_selector'];
		const main_nav_more_menu_items = this.params['nav_item_selectors'] + '[aria-expanded="false"] + ' + this.params['main_nav_selector'] + '--has-more-items';

		setTimeout(function () {
			document.querySelectorAll(main_nav_items).forEach(element => element.style.visibility = 'hidden');

			const more_menu = document.querySelector(main_nav_more_menu_items);

			if (more_menu) {
				more_menu.style.visibility = 'hidden';
			}
		}, 350);
	}

	/**
	 *
	 * Checks if the nav items should be closed
	 * @function
	 *
	 */
	check_for_close() {
		var nav_wrapper_selector = document.querySelector('.wsu-s-nav-horizontal__wrapper');

		if (!nav_wrapper_selector.contains(event.target)) {
			this.close_dropdowns(event);
		}
	}

	/**
	 *
	 * Return all nav_items with children on the page
	 * @function
	 *
	 */
	get get_nav_items() {
		return document.querySelectorAll(this.nav_items_selectors);
	}
}
