import wsu_bt_keyboard_nav_accessibility from '../keyboard-nav-accessibility/wsu-bt-keyboard-nav-accessibility';
import mitt from 'mitt'

export default class wsu_bt_vertical_nav {
	constructor(params) {
		this.params = params;
		this.nav_item_selector = '';
		this.nav_panel_control_selector = '';
		this.nav_panel_selector = '';
		this.nav_list_container_selector = '';
		this.body = document.body;
		this.tree_mode = false; // TODO needs to do something
		document.emitter = mitt();

		/**
		 *
		 * Assign values to variables
		 *
		 */

		/* Navigation item selector */
		this.nav_item_selector = params.nav_item_selector;

		if (typeof this.nav_item_selector === 'undefined') {
			console.error('Undefined nav_item_selector. Please pass the selector you would like to be expandable.');
		}

		/* Navigation Panel Control */
		this.nav_panel_control_selector = params.nav_panel_control_selector;

		if (typeof this.nav_panel_control_selector === 'undefined') {
			console.error('Undefined nav_panel_control_selector. Please pass the selector you would like to be expandable.');
		}

		this.nav_panel_control = document.querySelector(this.nav_panel_control_selector);

		/* Navigation Panel */
		this.nav_panel_selector = params.nav_panel_selector;

		if (typeof this.nav_panel_selector === 'undefined') {
			console.error('Undefined nav_panel_selector. Please pass the selector you would like to be expandable.');
		}

		this.nav_panel = document.querySelector(this.nav_panel_selector);

		/* Navigation List Container Selector */
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
		const nav_item_selector_elements = document.querySelectorAll(this.nav_list_container_selector);
		var keyboard_nav = new wsu_bt_keyboard_nav_accessibility({
			elements: nav_item_selector_elements
		});
		keyboard_nav.init();

		/**
		 *
		 * Set nav items to expanded false
		 *
		 */
		document.querySelector(this.nav_panel_control_selector).setAttribute('aria-expanded', 'false');
		document.querySelectorAll(this.nav_item_selector).forEach(elem => { elem.setAttribute('aria-expanded', 'false'); });

		/**
		 *
		 * Create event listeners
		 *
		 */

		/* Toggle Panels */
		this.nav_panel_control.addEventListener('click', this.togglePanel.bind(this));

		/* Toggle Nav Items */
		document.querySelectorAll('.wsu-s-nav-vertical__nav-item--has-children > .wsu-s-nav-vertical__nav-link').forEach(elem => { elem.addEventListener('click', this.toggle.bind(this)); }); // TODO: Abstract selector as parameter

		/* On panel open events */
		document.emitter.on('wsu-vertical-nav--after-open', this.panelOpened.bind(this));
	}

	openCurrentTarget(e) {
		e.preventDefault();
		e.currentTarget.setAttribute('aria-expanded', 'true');
	}

	openTarget(e) {
		e.preventDefault();
		e.target.setAttribute('aria-expanded', 'true');
	}

	openPanel() {
		/* Set aria expanded attribute */
		this.nav_panel_control.setAttribute('aria-expanded', 'true');

		/* Add class to wrapper */
		this.nav_panel.classList.add('wsu-s-nav-vertical__wrapper--open');

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
		const openAnimationTime = 600; // in ms the time it takes for the menu to finish opening

		setTimeout(() => {
			document.emitter.emit('wsu-vertical-nav--after-open');
		}, openAnimationTime);


		/**
		 *
		 * Add body class
		 *
		 */
		this.body.classList.add('wsu-s-nav-vertical__nav--is-open');

	}

	close(e) {
		e.preventDefault();
		e.target.setAttribute('aria-expanded', 'false');
	}

	closePanel() {
		/* Set aria expanded attribute */
		this.nav_panel_control.setAttribute('aria-expanded', 'false');

		/* Remove open class */
		this.nav_panel.classList.remove('wsu-s-nav-vertical__wrapper--open');

		/* Emit close event */
		document.emitter.emit('wsu-vertical-nav--close');

		/**
		 *
		 * Remove body class
		 *
		 */
		this.body.classList.remove('wsu-s-nav-vertical__nav--is-open');
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

	togglePanel(e) {
		e.preventDefault();

		if (this.nav_panel_control.getAttribute('aria-expanded') == 'true') {
			this.closePanel();
		} else {
			this.openPanel();
		}
	}

	panelOpened() {
		const closeButton = document.querySelector('.wsu-s-nav-vertical__nav-container-close-link');

		closeButton.style.opacity = 1;
		closeButton.style.marginTop = 0;

		/**
		 *
		 * Animate menu items in on vert nav open using emitters
		 *
		 */
		const navItems = document.querySelectorAll('.wsu-s-nav-vertical__nav-list-container > li');
		const navItemsCount = navItems.length;

		for (var i = 0; i < navItemsCount; i++) {
			(function (i) {
				const duration = 250;
				let increment = duration + (duration * i);

				setTimeout(function () {
					navItems[i].style.opacity = 1;
					navItems[i].style.marginLeft = '0';
				}, increment);
			})(i);
		};

		/**
		 *
		 * Create event listener for allowing panel to be closed on click
		 *
		 */
		const _this = this;

		window.addEventListener('click', function (e) {
			if (e.target.className == "wsu-s-nav-vertical__wrapper wsu-s-nav-vertical__wrapper--open") {
				_this.closePanel();
			}
		});


		/**
		 *
		 * Display global header when panel is opened if it exists
		 *
		 */
		const wsu_global_header = document.querySelector('.wsu-g-header__wrapper');

		if (typeof wsu_global_header != "undefined" && wsu_global_header != null) {
			document.body.classList.remove('wsu-g-header--is-hidden');
		}

	}
}
