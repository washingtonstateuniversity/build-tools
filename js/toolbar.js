// Document Body
var body = document.getElementsByTagName('body')[0];
body.style.paddingTop = "33px";

// Toolbar Wrapper
var toolbar = document.createElement('div');
toolbar.style.backgroundColor = "#263238";
toolbar.style.color = "#eceff1";
toolbar.style.position = "absolute";
toolbar.style.top = "0";
toolbar.style.width = "calc(100% - 20px)";
toolbar.style.height = "33px";
toolbar.style.display = "flex";
toolbar.style.justifyContent = "space-between";
toolbar.style.alignItems = "center";
toolbar.style.fontSize = "12px";

// Greeting
var greetingContainer = document.createElement('div');
var greetingContent = document.createTextNode("Go Cougs!");

greetingContainer.style.padding = "0 10px";

greetingContainer.appendChild(greetingContent);

// Current Breakpoint
var breakpointContainer = document.createElement('div');
var breakpointContent = document.createTextNode('Currently Breakpoint: Small');

breakpointContainer.style.backgroundColor = "#607d8b";
breakpointContainer.style.display = "flex";
breakpointContainer.style.alignItems = "center";
breakpointContainer.style.padding = "10px 3vw";

window.onresize = function () {
    var windowWidth = window.innerWidth;

    if (windowWidth > 768) {
        breakpointContainer.style.backgroundColor = "red";
    }
}

breakpointContainer.appendChild(breakpointContent);

// Window Width
var windowWidth = window.innerWidth;
var windowWidthContainer = document.createElement('div');
var windowContent = document.createTextNode('Window Width: ' + windowWidth + 'px');

window.onresize = function () {
    windowWidthContainer.removeChild(windowContent);
    windowWidth = window.innerWidth;
    windowContent = document.createTextNode('Window Width: ' + windowWidth + 'px');
    windowWidthContainer.appendChild(windowContent);
}

windowWidthContainer.appendChild(windowContent);

// Add Elements to Toolbar
toolbar.appendChild(greetingContainer);
toolbar.appendChild(breakpointContainer);
toolbar.appendChild(windowWidthContainer);

// Add Toolbar to DOM
body.appendChild(toolbar);
