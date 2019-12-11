// Document Body
var body = document.getElementsByTagName('body')[0];
body.style.paddingTop = "32px";

// Toolbar Wrapper
var toolbar = document.createElement('div');
toolbar.style.backgroundColor = "#1a1a1a";
toolbar.style.color = "#eceff1";
toolbar.style.position = "fixed";
toolbar.style.top = "0";
toolbar.style.width = "calc(100%)";
toolbar.style.height = "32px";
toolbar.style.display = "flex";
toolbar.style.justifyContent = "space-between";
toolbar.style.alignItems = "center";
toolbar.style.fontSize = "12px";
toolbar.style.flexWrap = "wrap";

// Greeting
var greetingContainer = document.createElement('div');
var greetingContent = document.createTextNode("Go Cougs!");

greetingContainer.style.padding = "0 10px";
greetingContainer.style.textTransform = "uppercase";
greetingContainer.style.fontStyle = "italic";
greetingContainer.style.fontWeight = "900";

greetingContainer.appendChild(greetingContent);

// Current Breakpoint
var breakpointContainer = document.createElement('div');
var breakpointContent = document.createTextNode('Base');

breakpointContainer.style.backgroundColor = "#A60F2D";
breakpointContainer.style.display = "flex";
breakpointContainer.style.alignItems = "center";
breakpointContainer.style.padding = "7px 3vw";
breakpointContainer.style.fontSize = "12px";
breakpointContainer.style.lineHeight = "12px";

breakpointContainer.appendChild(breakpointContent);

function updateBreakpointName() {
	var windowWidth = window.innerWidth;

	if (windowWidth < 767) {
		breakpointContainer.style.backgroundColor = "#A60F2D";
		breakpointContainer.removeChild(breakpointContent);
		breakpointContent = document.createTextNode('Base');
		breakpointContainer.appendChild(breakpointContent);
	} else if (windowWidth > 768 && windowWidth < 1023) {
		breakpointContainer.style.backgroundColor = "#ada400";
		breakpointContainer.removeChild(breakpointContent);
		breakpointContent = document.createTextNode('Small');
		breakpointContainer.appendChild(breakpointContent);
	} else if (windowWidth > 1024 && windowWidth < 1439) {
		breakpointContainer.style.backgroundColor = "#f6861f";
		breakpointContainer.removeChild(breakpointContent);
		breakpointContent = document.createTextNode('Medium');
		breakpointContainer.appendChild(breakpointContent);
	} else if (windowWidth > 1440) {
		breakpointContainer.style.backgroundColor = "#00a5bd";
		breakpointContainer.removeChild(breakpointContent);
		breakpointContent = document.createTextNode('Large');
		breakpointContainer.appendChild(breakpointContent);
	}
}

updateBreakpointName();

// Window Width
var windowWidth = window.innerWidth;
var windowWidthContainer = document.createElement('div');
var windowContent = document.createTextNode('Window Width: ' + windowWidth + 'px');

windowWidthContainer.style.padding = "0 10px";
windowWidthContainer.appendChild(windowContent);

function displayWindowWidthValue() {
	windowWidthContainer.removeChild(windowContent);
	windowWidth = window.innerWidth;
	windowContent = document.createTextNode('Window Width: ' + windowWidth + 'px');
	windowWidthContainer.appendChild(windowContent);
}

// Window Resize Events
window.onresize = function () {
	displayWindowWidthValue();
	updateBreakpointName();
};

// Add Elements to Toolbar
toolbar.appendChild(greetingContainer);
toolbar.appendChild(breakpointContainer);
toolbar.appendChild(windowWidthContainer);

// Add Toolbar to DOM
body.appendChild(toolbar);
