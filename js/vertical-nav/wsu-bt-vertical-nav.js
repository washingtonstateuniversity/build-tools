import wsu_wds from '../wsu-bt-wds';
import wsu_bt_keyboard_nav_accessibility from '../keyboard-nav-accessibility/wsu-bt-keyboard-nav-accessibility';

export default class wsu_bt_vertical_nav {
	constructor(params) {
		this.params = params;
		this.nav_item_selector = '';
		this.nav_panel_control_selector = '';
		this.nav_panel_selector = '';
		this.nav_list_container_selector = '';
		this.tree_mode = params.tree_mode ? true : false; // TODO needs to do something
		this.show_logs = params.show_logs ? true : false;
		this.start_collapsed_width = params.start_collapsed_width;

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

		// Toggle Panels
		this.nav_panel_control.addEventListener('click', this.toggle_panel.bind(this));

		// Toggle Nav Items
		document.querySelectorAll('.wsu-s-nav-vertical__nav-item--has-children > .wsu-s-nav-vertical__nav-link').forEach(elem => { elem.addEventListener('click', this.toggle.bind(this)); }); // TODO: Abstract selector as parameter

		// On panel open
		wsu_wds.emitter.on('wsu-vertical-nav--open', this.panel_open.bind(this));

		// After panel open
		wsu_wds.emitter.on('wsu-vertical-nav--after-open', this.panel_after_open.bind(this));

		// On panel close
		wsu_wds.emitter.on('wsu-vertical-nav--close', this.panel_close.bind(this));

		// After panel close
		wsu_wds.emitter.on('wsu-vertical-nav--after-close', this.panel_after_close.bind(this));

		/**
		 *
		 * Set default state as open
		 *
		 */
		if ( this.nav_panel.classList.contains('wsu-s-nav-vertical__wrapper--start-open' ) ) {

			this.nav_panel.classList.remove('wsu-s-nav-vertical__wrapper--start-open');

			if ( this.start_collapsed_width < window.innerWidth ) {
			
				this.open_panel();

			} else {

				this.close_panel();

			}
		}
	}

	open_current_target(e) {
		e.preventDefault();
		e.currentTarget.setAttribute('aria-expanded', 'true');
	}

	open_target(e) {
		e.preventDefault();
		e.target.setAttribute('aria-expanded', 'true');
	}

	open_panel() {
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
		wsu_wds.emitter.emit('wsu-vertical-nav--open');
		if (this.show_logs) {
			console.log('Event emitted: wsu-vertical-nav--open');
		}

		/**
		 *
		 * Event after open completes
		 * wsu-vertical-nav--after-open
		 *
		 */
		const openAnimationTime = 300; // in ms the time it takes for the menu to finish opening

		setTimeout(() => {
			wsu_wds.emitter.emit('wsu-vertical-nav--after-open');

			if (this.show_logs) {
				console.log('Event emitted: wsu-vertical-nav--after-open');
			}
		}, openAnimationTime);

		/**
		 *
		 * Add body class
		 *
		 */
		document.body.classList.add('wsu-s-nav-vertical__nav--is-open');
	}

	close(e) {
		e.preventDefault();
		e.target.setAttribute('aria-expanded', 'false');
	}

	close_panel() {
		/* Set aria expanded attribute */
		this.nav_panel_control.setAttribute('aria-expanded', 'false');

		/* Remove open class */
		this.nav_panel.classList.remove('wsu-s-nav-vertical__wrapper--open');

		/* Emit close event */
		wsu_wds.emitter.emit('wsu-vertical-nav--close');

		if (this.show_logs) {
			console.log('Event emitted: wsu-vertical-nav--close');
		}

		/**
		 *
		 * Event after close completes
		 * wsu-vertical-nav--after-close
		 *
		 */
		const closeAnimationTime = 600; // in ms the time it takes for the menu to finish opening

		setTimeout(() => {
			wsu_wds.emitter.emit('wsu-vertical-nav--after-close');

			if (this.show_logs) {
				console.log('Event emitted: wsu-vertical-nav--after-close');
			}
		}, closeAnimationTime);

		/**
		 *
		 * Remove body class
		 *
		 */
		document.body.classList.remove('wsu-s-nav-vertical__nav--is-open');
	}

	toggle(e) {
		if (e.currentTarget.getAttribute('aria-expanded') == 'false') {
			this.open_current_target(e);
		} else if (e.target.getAttribute('aria-expanded') == 'false') {
			this.open_target(e);
		} else {
			this.close(e);
		}
	}

	toggle_panel() {
		if (this.nav_panel_control.getAttribute('aria-expanded') == 'true') {
			this.close_panel();
		} else {
			this.open_panel();
		}
	}

	panel_open() {
		const closeButton = document.querySelector('.wsu-s-nav-vertical__nav-container-close-link');

		closeButton.classList.remove('fadeOutUp');
		closeButton.classList.add('animated', 'fadeInDown', 'faster');

		/**
		 *
		 * Animate menu items in on vert nav open using emitters
		 *
		 */
		const navItems = document.querySelectorAll('.wsu-s-nav-vertical__nav-list-container > li');
		const navItemsCount = navItems.length;

		for (var i = 0; i < navItemsCount; i++) {
			(function (i) {
				// Duration between each item being animated
				const duration = 30;
				const curve = 0.25;

				let increment = duration + (duration * (i * (i * curve))); // Bezier

				setTimeout(function () {
					navItems[i].classList.remove('fadeOutLeft');
					navItems[i].classList.add('animated', 'fadeInLeft');
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
				_this.close_panel();
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

		/**
		 *
		 * Resize horizontal nav if it exists
		 *
		 */
		const wsu_horz_nav = document.querySelectorAll('.wsu-s-nav-horizontal__wrapper');

		if (wsu_horz_nav.length !== 0) {
			// Resize horizontal navigation
			wsu_wds.horizontal_nav.update_nav();

			if (this.show_logs) {
				console.log('.wsu-s-nav-horizontal__wrapper exists');
			}
		} else {
			if (this.show_logs) {
				console.log('.wsu-s-nav-horizontal__wrapper does not exist');
			}
		}
	}

	panel_after_open() {
		/**
		 *
		 * Resize horizontal nav if it exists
		 *
		 */
		const wsu_horz_nav = document.querySelectorAll('.wsu-s-nav-horizontal__wrapper');

		if (wsu_horz_nav.length !== 0) {
			// Resize horizontal navigation
			wsu_wds.horizontal_nav.update_nav();

			if (this.show_logs) {
				console.log('.wsu-s-nav-horizontal__wrapper exists');
			}
		} else {
			if (this.show_logs) {
				console.log('.wsu-s-nav-horizontal__wrapper does not exist');
			}
		}
	}

	panel_close() {
		const closeButton = document.querySelector('.wsu-s-nav-vertical__nav-container-close-link');

		closeButton.classList.remove('fadeInDown');
		closeButton.classList.add('fadeOutUp');

		/**
		 *
		 * Animate menu items in on vert nav open using emitters
		 *
		 */
		const navItems = document.querySelectorAll('.wsu-s-nav-vertical__nav-list-container > li');
		const navItemsCount = navItems.length;

		for (var i = 0; i < navItemsCount; i++) {

			(function (i) {
				// Duration between each item being animated
				const duration = 50;
				let increment = duration + (duration * (i * (i * .2)));

				setTimeout(function () {
					navItems[i].classList.remove('fadeInLeft');
					navItems[i].classList.add('fadeOutLeft');
				}, increment);
			})(i);
		};
	}

	panel_after_close() {
		/**
		 *
		 * Resize horizontal nav if it exists
		 *
		 */
		const wsu_horz_nav = document.querySelectorAll('.wsu-s-nav-horizontal__wrapper');

		if (wsu_horz_nav.length !== 0) {
			// Resize horizontal navigation
			wsu_wds.horizontal_nav.update_nav();

			if (this.show_logs) {
				console.log('.wsu-s-nav-horizontal__wrapper exists');
			}
		} else {
			if (this.show_logs) {
				console.log('.wsu-s-nav-horizontal__wrapper does not exist');
			}
		}
	}
}
