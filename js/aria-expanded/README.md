# WSU Build Tools - ARIA Expanded
This script does the following:
1. Takes a selector and targets all instances of `aria-expanded`
2. Sets all instances of `aria-expanded` to `false`
3. Add events listeners to each item so, on click the attribute is toggled

## How to Use
_This assumes you've already installed the entire Build Tools package._

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
1. Import (maybe copy is better?) 
2. TODO: finish writing read me :) 
