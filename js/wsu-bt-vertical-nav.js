import wsu_bt_aria_expanded from '../../wsu-build-tools/js/aria-expanded/wsu-bt-aria-expanded';

export default class wsu_bt_vertical_nav {
	constructor(params) {
		// Default values
		this.params = params;
		this.nav_selector = '';
		this.tree_mode = false;

		// Assign values
		this.nav_selector = params.nav_selector;

		if (typeof this.nav_selector === 'undefined') {
			console.error('Undefined nav_selector. Please pass the selector you would like to be expandable.');
		}
	}

	init() {



		var expanded_aria_items = new wsu_bt_aria_expanded({
			nav_item_selector: this.nav_selector
		});
		// expanded_aria_items.init();

	}
}
