import wsu_bt_aria_expanded from '../aria-expanded/wsu-bt-aria-expanded';

export default class wsu_bt_vertical_nav {
	constructor(params) {
		// Default values
		this.params = params;
		this.nav_selector = '';
		this.nav_panel_control_selector = '';
		this.tree_mode = false;

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
		var expanded_aria_items = new wsu_bt_aria_expanded({
			nav_item_selector: this.nav_selector
		});

		expanded_aria_items.init();


		var expanded_aria_items = new wsu_bt_aria_expanded({
			nav_item_selector: this.nav_panel_control_selector
		});

		expanded_aria_items.init();

		// Close drawer button
		document.querySelector('.wsu-s-nav-vertical__nav-container-close-link').addEventListener('click', function (e) {
			e.preventDefault;

			document.querySelector('.wsu-s-nav-vertical__menu-icon-link').setAttribute('aria-expanded', 'false');
		});

		document.querySelector('.wsu-s-nav-vertical__nav-item--has-children').addEventListener('click', this.toggle_item.bind(this));
	}

	toggle_item(e) {
		e.preventDefault();
	}
}
