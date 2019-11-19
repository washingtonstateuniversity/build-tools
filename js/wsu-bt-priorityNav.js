"use strict";

export default class wsu_bt_priorityNav {
	constructor(mainNavSelector) {
		this.mainNavSelector = mainNavSelector;
		this.window = window;
		this.document = document;
	}

	// Methods
	init() {
		this.updateNav;
		window.addEventListener('resize', this.updateNav.bind(this));
	}

	updateNav() {
		if (this.screenWidth <= this.navWidth) {
			console.log('we are going to do things here');
		} else {
			console.log('do nothing there is enough room for everyone to be happy');
		}
	}

	// Getters
	get screenWidth() {
		const windowInnerWidth = this.window.innerWidth;
		return windowInnerWidth;
	}

	get navWidth() {
		const navInnerWidth = this.document.querySelector(this.mainNavSelector).offsetWidth;
		return navInnerWidth;
	}
}
