"use strict";

export default class wsu_bt_priorityNav {
	constructor(params) {
		this.document = document;
		this.window = window;
		this.params = params;
		this.breakpoints = [];
	}

	// Methods
	init() {
		this.updateNav();
		window.addEventListener('resize', this.updateNav.bind(this)); // TODO: look into if we need to use something like debounce or at the very least set a timeout
	}

	updateNav() {
		if (this.getPriorityNav == null && this.getScreenWidth <= this.getMainNavWidth) {
			this.createPriorityNav();
		}

		if (this.getPriorityNav != null) {
			this.resizeNav();
		}
	}

	createPriorityNav() {
		// Create elements
		const priorityNavListItem = document.createElement('li');
		const priorityNavListItemLink = document.createElement('a');
		const priorityNavUnorderedList = document.createElement('ul');

		// Create list item wrapper <li>
		priorityNavListItem.setAttribute('class', this.params['priorityNavListItemClassName']);
		priorityNavListItem.setAttribute('role', 'none');

		// Create list item link <a>
		priorityNavListItemLink.innerHTML = "More";
		priorityNavListItemLink.setAttribute('href', '#');
		priorityNavListItemLink.setAttribute('class', this.params['priorityNavListItemLinkClassName']);
		priorityNavListItemLink.setAttribute('role', 'menuitem');
		priorityNavListItemLink.setAttribute('tabindex', '-1');
		priorityNavListItemLink.setAttribute('aria-expanded', 'false');

		// Create unordered list item container <ul>
		priorityNavUnorderedList.setAttribute('class', this.params['priorityNavListItemListClassName']);
		priorityNavUnorderedList.setAttribute('role', 'menu');
		priorityNavUnorderedList.setAttribute('aria-abel', 'Replace Me w/ Link Name Submenu');

		// Append to dom
		priorityNavListItem.appendChild(priorityNavListItemLink);
		priorityNavListItem.appendChild(priorityNavUnorderedList);
		document.querySelector('.wsu-s-nav-horizontal__nav-list').appendChild(priorityNavListItem);
	}

	resizeNav() {

		this.calculateWidths();

		// Move items to priority nav
		while (this.screenWidth <= this.mainNavWidth && this.getMainNav.children.length > 0) {
			const itemToMove = this.getMainNav.children[this.getMainNav.children.length - 2];
			this.moveToPriorityNav(itemToMove);
			this.calculateWidths();
		}

		// Move items to main nav
		while (this.screenWidth >= this.breakpoints[this.breakpoints.length - 1] && this.getPriorityNavSubmenu.children.length > 0) {
			this.moveToMainNav(this.getPriorityNavSubmenu.children[0]);
		}

		// Turn off priority nav if unnecessary
		if (this.breakpoints.length == 0) {
			this.destroyPriorityNav();
		}
	}

	calculateWidths() {
		this.mainNavWidth = this.getMainNavWidth;
		this.screenWidth = this.getScreenWidth;
	}

	moveToPriorityNav(itemToMove) {
		this.getPriorityNavSubmenu.insertAdjacentElement('afterbegin', itemToMove);
		this.breakpoints.push(this.mainNavWidth);
	}

	moveToMainNav(itemToMove) {
		this.getMainNav.insertBefore(itemToMove, this.getMainNav.lastElementChild);
		this.breakpoints.pop();
	}

	destroyPriorityNav() {
		this.getPriorityNav.remove();
	}

	// Getters
	get getScreenWidth() {
		const windowInnerWidth = this.window.innerWidth;
		return windowInnerWidth;
	}

	get getMainNavWidth() {
		const mainNavInnerWidth = this.document.querySelector(this.params['mainNavSelector']).offsetWidth;
		return mainNavInnerWidth;
	}

	get getMainNav() {
		const mainNav = document.querySelector(this.params['mainNavSelector']);
		return mainNav;
	}

	get getPriorityNav() {
		const priorityNav = this.document.querySelector('.' + this.params['priorityNavListItemClassName']);
		return priorityNav;
	}

	get getPriorityNavSubmenu() {
		const priorityNav = this.document.querySelector('.' + this.params['priorityNavListItemListClassName']);
		return priorityNav;
	}

	get getBreakpoints() {
		const breakpoints = this.breakpoints;
		return breakpoints;
	}
}
