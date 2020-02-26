export default class wsu_bt_aria_expanded {
	constructor(params) {
		this.params = params;
		this.nav_items = null;
		this.show_logs = params.show_logs ? true : false;

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
		this.process_params();
		// window.addEventListener('resize', this.update_items.bind(this));
		// window.addEventListener('click', this.check_for_close.bind(this, event));
		this.init_mutation_observers();
	}

	/**
	 * Process the input params to support array or string values
	 * @function
	 */
	process_params() {
		if (Array.isArray(this.nav_items_selectors)) {
			this.nav_items_selectors.forEach(element => {
				this.set_init_state(element);
			});
		} else {
			this.set_init_state(this.nav_items_selectors);
		}
	}

	/**
	 * Set initial state for aria-expanded items
	 * @param {object} elements
	 */
	set_init_state(elements) {
		const nav_items = document.querySelectorAll(elements);
		const _this = this;

		nav_items.forEach(nav_item => {
			// Initial on page load state
			nav_item.setAttribute('aria-expanded', 'false');

			// Create event listeners for each nav item
			nav_item.addEventListener('click', function (e) {
				e.preventDefault();
				_this.toggle_aria_expanded_state(e.target);
			});

			// If animations are enabled, add the default animated class
			if (_this.use_animations) {
				const nav_item_children = Array.from(nav_item.nextElementSibling.children);

				nav_item_children.forEach(nav_item => {
					nav_item.classList.add('animated');
				});
			}
		});
	}

	/**
	 * Toggle the aria-expanded element state
	 * @param {object} element
	 */
	toggle_aria_expanded_state(element) {
		const isClosed = element.getAttribute('aria-expanded') ? 'false' : 'true';

		if (isClosed) {
			element.setAttribute('aria-expanded', 'true');
		} else {
			element.setAttribute('aria-expanded', 'false');
		}
	}

	/**
	 * Place to init any Mutation Observers
	 * @function
	 */
	init_mutation_observers() {
		if (this.use_animations) {
			this.create_mutation(this.params.nav_item_selectors, this.check_element_view_state.bind(this));
		}
	}

	/**
	 * Creates mutation observers to watch state and allows you to tell it what to do on modification
	 * @param {string} target_query_selector
	 * @param {method} on_modify_method
	 */
	create_mutation(target_query_selector, on_modify_method) {
		// Select the node that will be observed for mutations
		const targetNode = document.querySelector(target_query_selector);

		// Options for the observer (which mutations to observe)
		const config = { attributes: true, childList: false, subtree: false };

		// Global scope
		const _this = this;

		// Callback function to execute when mutations are observed
		const callback = function (mutationsList, observer) {
			// Use traditional 'for loops' for IE 11
			for (let mutation of mutationsList) {
				if (mutation.type === 'attributes') {
					if (_this.show_logs) {
						console.log('The ' + mutation.attributeName + ' attribute was modified.');
					}
					on_modify_method(mutation);
				}
			}
		};

		// Create an observer instance linked to the callback function
		const observer = new MutationObserver(callback);

		// Start observing the target node for configured mutations
		observer.observe(targetNode, config);
	}

	/**
	 * Checks whether items are expanded true or false
	 * @param {object} element
	 */
	check_element_view_state(element) {
		const state_is_open = element.target.getAttribute('aria-expanded') ? 'true' : 'false';
		const nav_item_container = element.target.nextElementSibling;
		const nav_items = Array.from(element.target.nextElementSibling.children);

		// The motion to the ocean
		if (state_is_open) {
			this.animate_element_in(nav_item_container);
			this.animate_elements_in(nav_items);
		} else {
			this.animate_element_out(nav_item_container);
			this.animate_elements_out(nav_items);
		}
	}

	/**
	 * Animate an individual element in
	 * @param {object} element
	 */
	animate_element_in(element) {
		element.style.visibility = 'visible';
		element.classList.remove('fadeOutDown');
		element.classList.add('fadeInUp');
	}

	/**
	 * Animate an array of elements onto the screen incrementally
	 * @param {object} elements
	 */
	animate_elements_in(elements) {
		// Children Items
		const sub_nav_items = elements;
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

	animate_element_out(element, timeOutDuration = 350) {
		element.classList.remove('fadeOutDown');
		element.classList.add('fadeInUp');

		// Remove container from screen after animation finishes
		setTimeout(function () {
			element.style.visibility = 'hidden';
		}, timeOutDuration);
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

	animate_item(elements_to_animate, add = 'fadeOutDown', remove = 'fadeInUp') {
		elements_to_animate.classList.remove(remove);
		elements_to_animate.classList.add(add);
	}

	animate_items(elements_to_animate, add = 'fadeOutDown', remove = 'fadeInUp') {
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
