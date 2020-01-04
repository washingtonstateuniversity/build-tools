import wsu_bt_keyboard_nav_accessibility from '../keyboard-nav-accessibility/wsu-bt-keyboard-nav-accessibility';
import mitt from 'mitt'

export default class wsu_bt_vertical_nav {
	constructor(params) {
		this.params = params;
		this.nav_selector = '';
		this.nav_panel_control_selector = '';
		this.nav_list_container_selector = '';
		this.tree_mode = false;
		document.emitter = mitt();

		// Assign values
		this.nav_selector = params.nav_selector;

		if (typeof this.nav_selector === 'undefined') {
			console.error('Undefined nav_selector. Please pass the selector you would like to be expandable.');
		}

		this.nav_panel_control_selector = params.nav_panel_control_selector;

		if (typeof this.nav_panel_control_selector === 'undefined') {
			console.error('Undefined nav_panel_control_selector. Please pass the selector you would like to be expandable.');
		}

		this.nav_list_container_selector = params.nav_list_container_selector;

		if (typeof this.nav_list_container_selector === 'undefined') {
			console.error('Undefined nav_list_container_selector. Please pass the selector you would like to be expandable.');
		}
	}

	init() {
		/**
		 *
		 * Enable keyboard navigation accessibility
		 *
		 */
		const nav_selector_elements = document.querySelectorAll(this.nav_list_container_selector);
		var keyboard_nav = new wsu_bt_keyboard_nav_accessibility({
			elements: nav_selector_elements
		});
		keyboard_nav.init();

		/**
		 *
		 * Set nav items to expanded false
		 *
		 */
		document.querySelectorAll(this.nav_selector).forEach(elem => { elem.setAttribute('aria-expanded', 'false'); });
		document.querySelector(this.nav_panel_control_selector).setAttribute('aria-expanded', 'false');

		/**
		 *
		 * Create event listeners for various controls
		 *
		 */

		/* Close */
		document.querySelector('.wsu-s-nav-vertical__nav-container-close-link').addEventListener('click', this.close.bind(this));

		/* Toggle */
		document.querySelector('.wsu-s-nav-vertical__menu-icon-link').addEventListener('click', this.toggle.bind(this));
		document.querySelector('.wsu-s-nav-vertical__nav-item--has-children').addEventListener('click', this.toggle.bind(this));
	}

	openCurrentTarget(e) {
		e.preventDefault;

		if ('.' + e.target.className == this.nav_panel_control_selector) {
			/* Set aria expanded attribute */
			e.currentTarget.setAttribute('aria-expanded', 'true');

			/* Add class to wrapper */
			document.querySelector('.wsu-s-nav-vertical__wrapper').classList.add('wsu-s-nav-vertical__wrapper--open');

			/**
			 *
			 * Event on open
			 * wsu-vertical-nav--open
			 *
			 */
			document.emitter.emit('wsu-vertical-nav--open');

			/**
			 *
			 * Event after open completes
			 * wsu-vertical-nav--after-open
			 *
			 */
			const openAnimationTime = 800; // in ms the time it takes for the menu to finish opening

			setTimeout(() => {
				document.emitter.emit('wsu-vertical-nav--after-open');
			}, openAnimationTime);
		} else {
			e.currentTarget.setAttribute('aria-expanded', 'true');
		}
	}

	openTarget(e) {
		e.preventDefault;

		if ('.' + e.target.className == this.nav_panel_control_selector) {
			/* Set aria expanded attribute */
			e.target.setAttribute('aria-expanded', 'true');

			/* Add class to wrapper */
			document.querySelector('.wsu-s-nav-vertical__wrapper').classList.add('wsu-s-nav-vertical__wrapper--open');

			/**
			 *
			 * Event on open
			 * wsu-vertical-nav--open
			 *
			 */
			document.emitter.emit('wsu-vertical-nav--open');

			/**
			 *
			 * Event after open completes
			 * wsu-vertical-nav--after-open
			 *
			 */
			const openAnimationTime = 800; // in ms the time it takes for the menu to finish opening
			setTimeout(() => {
				document.emitter.emit('wsu-vertical-nav--after-open');
			}, openAnimationTime);
		} else {
			e.target.setAttribute('aria-expanded', 'true');
		}
	}

	close(e) {
		e.preventDefault;

		if (e.currentTarget.className == 'wsu-s-nav-vertical__nav-container-close-link') {

			document.querySelector('.wsu-s-nav-vertical__wrapper').classList.remove('wsu-s-nav-vertical__wrapper--open');
			document.querySelectorAll('[aria-expanded="true"]').forEach(el => {
				el.setAttribute('aria-expanded', 'false');
			});

			document.emitter.emit('close');

		} else {
			e.target.setAttribute('aria-expanded', 'false');
		}
	}

	toggle(e) {
		if (e.currentTarget.getAttribute('aria-expanded') == 'false') {
			this.openCurrentTarget(e);
		} else if (e.target.getAttribute('aria-expanded') == 'false') {
			this.openTarget(e);
		} else {
			this.close(e);
		}
	}

}
