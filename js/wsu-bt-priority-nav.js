import wsu_bt_aria_expanded from './aria-expanded/wsu-bt-aria-expanded';
import { Menubar } from './keyboard-nav-accessibility/MenubarLinks';

export default class wsu_bt_priority_nav {
	constructor(params) {
		this.breakpoints = [];
		this.main_nav_width = null;
		this.params = params;
		this.screenWidth = null;
		this.window = window;
	}

	// Methods
	init() {
		this.update_nav();
		window.addEventListener('resize', this.update_nav.bind(this)); // TODO: look into if we need to use something like debounce or at the very least set a timeout
	}

	update_nav() {
		// Check if all fonts are loaded
		// TODO: Fix for ie 11 & edge (needs testing)
		document.fonts.ready.then(() => {

			// If doesn't exist & Nav is greater than screen width, create nav
			if (this.get_priority_nav == null && this.get_frame_width <= this.get_main_nav_width) {
				this.create_priority_nav();
			}

			// If nav exists, just resize it
			if (this.get_priority_nav != null) {
				this.resize_nav();
			}

			this.initiateKeyboardNavigationSupport();
			this.initiateAriaExpanded();
		});
	}

	create_priority_nav() {
		// Create elements
		const priority_nav_list_item = document.createElement('li');
		const priority_nav_list_item_link = document.createElement('a');
		const priority_nav_unordered_list = document.createElement('ul');

		// Create list item wrapper <li>
		priority_nav_list_item.setAttribute('class', this.params['priority_nav_list_item_class_name']);
		priority_nav_list_item.setAttribute('role', 'none');

		// Create list item link <a>
		priority_nav_list_item_link.innerHTML = this.params['more_inner_html'];
		priority_nav_list_item_link.setAttribute('href', '#');
		priority_nav_list_item_link.setAttribute('class', this.params['priority_nav_list_item_link_class_name']);
		priority_nav_list_item_link.setAttribute('role', 'menuitem');
		priority_nav_list_item_link.setAttribute('tabindex', '-1');
		priority_nav_list_item_link.setAttribute('aria-expanded', 'true');
		priority_nav_list_item_link.setAttribute('aria-haspopup', 'true');

		// Create unordered list item container <ul>
		priority_nav_unordered_list.setAttribute('class', this.params['priority_nav_list_item_list_class_name']);
		priority_nav_unordered_list.setAttribute('role', 'menu');
		priority_nav_unordered_list.setAttribute('aria-abel', 'Replace Me w/ Link Name Submenu');

		// Append to dom
		priority_nav_list_item.appendChild(priority_nav_list_item_link);
		priority_nav_list_item.appendChild(priority_nav_unordered_list);
		document.querySelector(this.params['main_nav_selector']).appendChild(priority_nav_list_item);
	}

	resize_nav() {
		this.calculateWidths();

		// Move items to priority nav
		while (this.screenWidth <= this.main_nav_width && this.get_main_nav.children.length > 0) {
			const itemToMove = this.get_main_nav.children[this.get_main_nav.children.length - 2];
			this.moveToPriorityNav(itemToMove);
			this.calculateWidths();
		}

		// Move items to main nav
		while (this.screenWidth >= this.breakpoints[this.breakpoints.length - 1] && this.get_priority_nav_submenu.children.length > 0) {
			this.moveToMainNav(this.get_priority_nav_submenu.children[0]);
		}

		// Turn off priority nav if unnecessary
		if (this.breakpoints.length == 0) {
			this.destroyPriorityNav();
		}
	}

	calculateWidths() {
		this.main_nav_width = this.get_main_nav_width;
		this.screenWidth = this.get_frame_width;
	}

	moveToPriorityNav(itemToMove) {
		this.cleanItemBeforeMove(itemToMove);
		this.get_priority_nav_submenu.insertAdjacentElement('afterbegin', itemToMove);
		this.breakpoints.push(this.main_nav_width);
	}

	moveToMainNav(itemToMove) {
		this.cleanItemBeforeMove(itemToMove);
		this.get_main_nav.insertBefore(itemToMove, this.get_main_nav.lastElementChild);
		this.breakpoints.pop();
	}

	cleanItemBeforeMove(item_to_clean) {
		const class_list = item_to_clean.classList;
		const dirty_classes = [
			'animated',
			'fadeOutDown',
			'fadeInUp'
		];

		dirty_classes.forEach(dirty_class => {
			if (Array.from(class_list).includes(dirty_class)) {
				class_list.remove(dirty_class);
			}
		});
	}

	destroyPriorityNav() {
		this.get_priority_nav.remove();
	}

	// Initiate collapsable aria-expanded items
	initiateAriaExpanded() {
		var expanded_aria_items = new wsu_bt_aria_expanded({
			nav_item_selectors: '.' + this.params['priority_nav_list_item_link_class_name'],
			use_animations: true,
			show_logs: true
		});
		expanded_aria_items.init();
	}

	// Initiate keyboard controls for accessibility support
	initiateKeyboardNavigationSupport() {
		var menubar = new Menubar(document.querySelector(this.params['main_nav_selector']));
		menubar.init();
	}

	// Getters
	get get_frame_width() {
		const windowInnerWidth = document.querySelector('.wsu-s-nav-horizontal__nav-container').offsetWidth;
		return windowInnerWidth;
	}

	get get_main_nav_width() {
		const mainNavInnerWidth = document.querySelector(this.params['main_nav_selector']).offsetWidth;
		return mainNavInnerWidth;
	}

	get get_main_nav() {
		const mainNav = document.querySelector(this.params['main_nav_selector']);
		return mainNav;
	}

	get get_priority_nav() {
		const priority_nav = document.querySelector('.' + this.params['priority_nav_list_item_class_name']);
		return priority_nav;
	}

	get get_priority_nav_submenu() {
		const priority_nav = document.querySelector('.' + this.params['priority_nav_list_item_list_class_name']);
		return priority_nav;
	}

	get getBreakpoints() {
		const breakpoints = this.breakpoints;
		return breakpoints;
	}
}
