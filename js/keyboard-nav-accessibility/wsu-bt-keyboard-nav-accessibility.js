import { Menubar } from '../keyboard-nav-accessibility/MenubarLinks';

export default class wsu_bt_keyboard_nav_accessibility {
	constructor(params) {
		this.params = params;
	}

	init() {
		/**
		 *
		 * Loop through elements that we want to have keyboard support and make it so
		 *
		 */
		this.params['elements'].forEach(element => {
			this.initiateKeyboardNavigationSupport(element);
		});
	}

	initiateKeyboardNavigationSupport(element) {
		var menubar = new Menubar(element);
		menubar.init();
	}
}
