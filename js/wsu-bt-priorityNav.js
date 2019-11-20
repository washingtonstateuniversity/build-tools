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

			if (this.breakpoints.length < 1) {
				this.destroyPriorityNav();
			}

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
		// TODO: add aria-expanded support

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

		console.log('Main Nav Width: ' + this.getMainNavWidth);
		console.log('Screen Width: ' + this.getScreenWidth);
		console.log(this.breakpoints);

		while (this.getScreenWidth <= this.getMainNavWidth && this.getMainNav.children.length > 0) {
			const itemToMove = this.getMainNav.children[this.getMainNav.children.length - 2];
			this.moveToPriorityNav(itemToMove);

			console.log('true 1');
		}

		while (this.getScreenWidth >= this.breakpoints[this.breakpoints.length - 1] && this.getPriorityNavSubmenu.children.length > 0) {
			const itemToMove = this.getPriorityNavSubmenu.children[0];
			this.moveToMainNav(itemToMove);

			console.log('true 2');
		}

	}

	moveToPriorityNav(itemToMove) {
		this.getPriorityNavSubmenu.prepend(itemToMove);
		this.breakpoints.push(this.getMainNavWidth);
	}

	moveToMainNav(itemToMove) {
		this.getMainNav.append(itemToMove);
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
}
