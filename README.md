# WSU Build Tools

## Getting Started
1. Install package `npm install --save-dev https://github.com/washingtonstateuniversity/wsu-build-tools.git`
2. Import SCSS `@import '~@wsu/build-tools/scss/all-the-things';`
3. Build away!

## Mixins
- Animations
- Color
- Font Size
- Grid
- Is Elements
- Media Queries
- Z Index

### Is Elements
Is elements are design to provide commonly reoccursing css properties and values. Is elements currently supports:
- is-icon-container `@include is-icon-container();`
- is-icon `@include is-icon($unit-xl);`
- is-psuedo-element
- TODO: Create is-icon-container-item and move current is-icon to it and replace with more vanilla use-case of just displaying an svg inline next to its elements

## Typography
Sets the baseline font, color, and sizing values for typography.

## Variables
Sets all the variables for the build tool including: unit sizes, breakpoints, colors, typography, and link color.

## Reset
The reset provides a baseline for all projects to be based off of. 