# ng-accordian
A simple, dependency free AngularJS accordian style directive

# Getting Started

```
bower install ng-accordian
```

 * Include the `ngAccordian` module as a dependency in your AngularJS application 

```javascript
angular.module('app', ['ngAccordian'])
```

 * Include the `ngAccordian.css` style sheet

```html
<link rel="stylesheet" href="/ng-accordian.css" />
```

# Basic Usage

**With templating** via `content-url`
```html
<accordian >
  <toggle content-url="/views/content.html"></toggle>
  <toggle content-url="/views/content.html"></toggle>
  <toggle content-url="/views/content.html"></toggle>
</accordian>
```

**With configuration**
```html
<accordian>
  <toggle ng-repeat="c in content" content-url="{{ c.value }}"></toggle>
</accordian>
```

```javascript
$scope.content = [
  { 'value': '/views/content.html' },
  { 'value': '/views/content.html' },
  { 'value': '/views/content.html' }
];
```

**With explicit content** via `content`

```html
<accordian>
  <toggle ng-repeat="c in content" content="{{ c.value }}"></toggle>
</accordian>
```

```javascript
$scope.content = [
  { 'value': '<span> er </span>' },
  { 'value': '<span> um </span>' },
  { 'value': '<span> eh </span>' }
];
```

**As a standalone dropdown**

```html
<toggle content-url="/views/content.html"></toggle>
```

# Attribute Usage

| Attribute							| Description																							| Example																					|
| ----------------------------------|:------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------|
|  `content-url`					| Specifies the location to <br>the HTML template														| `<toggle content-url="/views/demo-content.html"></toggle>`								|
|  `content`						| Specifies the content markup																			| `<toggle content="{{ content }}></toggle>`<br> `$scope.content = '<span>stuff</span>'`    |
|  `close-others`					| Specifies whether to display<br> one pane at a time													| `<accordian close-others="true | false">`													|
|  `toggle-icon`<br> (optional)		| Specifies a built in icon <br><br> may be applied to <br> `<accordian>` or `<toggle>`					| `<accordian toggle-icon="chevron | plus">` <br> `<toggle toggle-icon="chevron | plus">`	|

# Toggle Icons

| Value                     | Demo												| 
| ------------------------- |:--------------------------------------------------|
|  `toggle-icon="chevron"`  | [JSFiddle](http://jsfiddle.net/sniro/1eovLxpo/)	|
|  `toggle-icon="plus"`     | [JSFiddle](http://jsfiddle.net/sniro/hvczkjeo/)	|     

# Core Team Members

 - [@scniro](https://twitter.com/scniro)