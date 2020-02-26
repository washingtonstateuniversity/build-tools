export default class wsu_bt_aria_expanded {
	constructor(params) {
		this.params = params;
		this.nav_items = null;
		this.show_logs = params.show_logs ? true : false;

		/**
		 * Assign nav_items_selectors to variable
		 */
		this.nav_items_selectors = params.nav_item_selectors;

		if (typeof this.nav_items_selectors === 'undefined') {
			console.error('Undefined nav_item_selectors. Please pass the selector you would like to be expandable.');
		}

		/**
		 * Assign use_animations to variable
		 */
		this.use_animations = params.use_animations;

		if (typeof this.use_animations === 'undefined') {
			this.use_animations = false;
		}
	}

	/**
	 * Init
	 *
	 */
	init() {
		this.set_init_state();
		window.addEventListener('click', this.check_for_close.bind(this, event));

		if (this.use_animations) {
			this.init_mutation_observers();
		}
	}

	/**
	 * Set initial state for aria-expanded items
	 *
	 * @param {element} elements
	 */
	set_init_state() {
		const nav_items = this.query_all_nav_items;
		const _this = this;

		nav_items.forEach(nav_item => {
			// Initial on page load state
			nav_item.setAttribute('aria-expanded', 'false');

			// Create event listeners for each nav item
			nav_item.addEventListener('click', function (event) {
				event.preventDefault();
				_this.toggle_aria_expanded_state(event.currentTarget);
			});
		});

		// If animations are enabled, add the default animated class
		if (_this.use_animations) {
			const nav_items_to_animate = this.query_all_nav_items;

			nav_items_to_animate.forEach(nav_item => {

				nav_item.nextElementSibling.classList.add('animated');

				const nav_item_children = Array.from(nav_item.nextElementSibling.children);

				nav_item_children.forEach(nav_item => {
					nav_item.classList.add('animated');
				});

			});
		}
	}

	/**
	 * Toggle the aria-expanded element state
	 *
	 * @param {element} element
	 */
	toggle_aria_expanded_state(element) {
		if (element.getAttribute('aria-expanded') === 'false') {
			element.setAttribute('aria-expanded', 'true');
		} else {
			element.setAttribute('aria-expanded', 'false');
		}
	}

	/**
	 * Set aria-expanded element state
	 *
	 * @param {element} element Element you want state to be updated on
	 * @param {boolean} state Set element state to true or false
	 */
	set_aria_expanded_state(element, state) {
		element.setAttribute('aria-expanded', state);
	}

	/**
	 * Place to init any Mutation Observers
	 *
	 * @function
	 */
	init_mutation_observers() {
		this.create_mutation(this.params.nav_item_selectors, this.check_element_view_state.bind(this));
	}

	/**
	 * Creates mutation observers to watch state and allows you to tell it what to do on modification
	 *
	 * @param {string} target_query_selector
	 * @param {method} on_modify_method
	 */
	create_mutation(target_query_selector, on_modify_method) {
		// Select the node that will be observed for mutations
		const targetNodes = document.querySelectorAll(target_query_selector);

		// Options for the observer (which mutations to observe)
		const config = { attributes: true, childList: false, subtree: false };

		// Global scope
		const _this = this;

		targetNodes.forEach(targetNode => {
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
		});
	}

	/**
	 * Checks whether items are expanded true or false
	 *
	 * @param {object} mutation_record Returns what has been modified from the observer call back function
	 */
	check_element_view_state(mutation_record) {
		if (mutation_record.attributeName === 'aria-expanded') {
			const nav_item_container = mutation_record.target.nextElementSibling;
			const nav_items = Array.from(mutation_record.target.nextElementSibling.children);

			if (mutation_record.target.getAttribute('aria-expanded') == 'true') {
				// Animate in
				this.animate_item(nav_item_container);
				this.animate_items(nav_items);
			} else {
				// Animate out
				this.animate_item(nav_item_container, 'fadeOutDown', 'fadeInUp', 'out');
				this.animate_items(nav_items, 'fadeOutDown', 'fadeInUp');
			}
		}
	}


	/**
	 * Animate a single item in or out of your display
	 *
	 * @param {element} element_to_animate The element you want to be animated
	 * @param {string} add The animation to be added
	 * @param {string} remove The animation to be removed
	 * @param {string} direction The direction in which your animation is going, in (becoming visible) and out (becoming invisible)
	 * @param {number} time_out_duration The timeout that controls when your animation is finished when animating out
	 */
	animate_item(element_to_animate, add = 'fadeInUp', remove = 'fadeOutDown', direction = 'in', time_out_duration = 350) {
		// Animate element
		element_to_animate.classList.remove(remove);
		element_to_animate.classList.add(add);

		// // Check direction and set visibility state
		// if (direction == 'in') {
		// 	element_to_animate.style.visibility = 'visible';
		// } else {
		// 	setTimeout(function () {
		// 		element_to_animate.style.visibility = 'hidden';
		// 	}, time_out_duration);
		// }
	}

	/**
	 * Animate an array of elements onto the screen sequentially
	 *
	 * @param {Array} elements_to_animate The elements you want to be animated
	 * @param {string} add The animation to be added
	 * @param {string} remove The animation to be removed
	 */
	animate_items(elements_to_animate, add = 'fadeInUp', remove = 'fadeOutDown') {
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

	/**
	 * Checks if the nav items should be closed
	 *
	 * @function
	 */
	check_for_close() {
		var nav_wrapper_selector = document.querySelector('.wsu-s-nav-horizontal__wrapper');

		if (!nav_wrapper_selector.contains(event.target)) {
			const all_items = this.query_all_open_nav_items;

			all_items.forEach(item => {
				this.set_aria_expanded_state(item, false);
			});
		}
	}

	get query_all_open_nav_items() {
		return document.querySelectorAll('.wsu-s-nav-horizontal__nav-link[aria-expanded="true"]');
	}

	get query_all_nav_items() {
		return document.querySelectorAll('.wsu-s-nav-horizontal__nav-link[aria-expanded]');
	}
}
