import wsu_bt_aria_expanded from '../aria-expanded/wsu-bt-aria-expanded';
import mitt from 'mitt'

export default class wsu_bt_vertical_nav {
	constructor(params) {
		// Default values
		this.params = params;
		this.nav_selector = '';
		this.nav_panel_control_selector = '';
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
	}

	init() {
		// var expanded_aria_items = new wsu_bt_aria_expanded({
		// 	nav_item_selector: this.nav_selector
		// });

		// expanded_aria_items.init();


		// var expanded_aria_items = new wsu_bt_aria_expanded({
		// 	nav_item_selector: this.nav_panel_control_selector
		// });

		// expanded_aria_items.init();

		document.querySelector(this.nav_selector).setAttribute('aria-expanded', 'false');
		document.querySelector(this.nav_panel_control_selector).setAttribute('aria-expanded', 'false');

		// Event Listeners
		document.querySelector('.wsu-s-nav-vertical__menu-icon-link').addEventListener('click', this.toggle.bind(this));

		document.querySelector('.wsu-s-nav-vertical__nav-container-close-link').addEventListener('click', this.close.bind(this));

		document.querySelector('.wsu-s-nav-vertical__nav-item--has-children').addEventListener('click', this.toggle.bind(this));
	}

	open(e) {
		e.preventDefault;
		document.querySelector('.wsu-s-nav-vertical__wrapper').classList.add('wsu-s-nav-vertical__wrapper--open');

		document.emitter.emit('open');
	}

	close(e) {
		e.preventDefault;
		document.querySelector('.wsu-s-nav-vertical__wrapper').classList.remove('wsu-s-nav-vertical__wrapper--open');
		document.querySelectorAll('[aria-expanded="true"]').forEach(el => {
			el.setAttribute('aria-expanded', 'false');
		});

		document.emitter.emit('close');

	}

	toggle(e) {
		if (e.currentTarget.getAttribute('aria-expanded') == 'false') {
			this.open(e);
			e.currentTarget.setAttribute('aria-expanded', 'true');
		} else {
			this.close(e);
		}
	}

}
