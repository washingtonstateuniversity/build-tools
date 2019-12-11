# WSU Build Tools - ARIA Expanded
This script does the following:
1. Takes a selector and targets all instances of `aria-expanded`
2. Sets all instances of `aria-expanded` to `false`
3. Add events listeners to each item so, on click the attribute is toggled

## How to Use
_This assumes you've already installed the entire Build Tools package. (See main Build Tools package here)[https://github.com/washingtonstateuniversity/wsu-build-tools]_ 

### JS
1. In your js add `import wsu_bt_aria_expanded from '@wsu-build-tools/js/wsu-bt-aria-expanded';`

1. Install package `npm install --save-dev https://github.com/washingtonstateuniversity/wsu-build-tools.git`
2. Create new instance of aria_expanded class:
```
var expanded_aria_items = new wsu_bt_aria_expanded({
	nav_item_selector: '.your-nav-selector-here'
});
```
3. Initialize class `expanded_aria_items.init();`

### CSS
1. Copy CSS into your stylesheet
```
.wsu-s-nav-vertical__nav-link[aria-expanded="true"] ~ .wsu-s-nav-horizontal__nav-list,
.wsu-s-nav-vertical__nav-link[aria-expanded="true"] ~ .wsu-s-nav-horizontal__nav-list--has-more-items {
	// Show stuff here
}

.wsu-s-nav-vertical__nav-link[aria-expanded="false"] ~ .wsu-s-nav-horizontal__nav-list,
.wsu-s-nav-vertical__nav-link[aria-expanded="false"] ~ .wsu-s-nav-horizontal__nav-list--has-more-items {
	// Hide stuff here
}
```
2. Update class names to target your nav link items and their subsequent nav list containers (and potentially even more sub-menu containers 😃) 
3. Update the properties to show/hide the elements how you'd like them to behave 💃
