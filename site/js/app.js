var app = angular.module('app', ['ngAccordian', 'ui.router']);

app.constant('tplBase', document.location.hostname === 'localhost' ? '/site/' : '/ng-accordian/');

app.constant('srcBase', document.location.hostname === 'localhost' ? '' : '/ng-accordian/');

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.html5Mode({
		enabled: true
	});

	$stateProvider
		.state('home', {
			url: '/',
			controller: 'gettingStartedCtrl',
			templateUrl: 'view/getting-started.html'
		})
		.state('basic', {
			url: '/examples/basic',
			controller: 'basicCtrl',
			templateUrl: 'view/examples/basic.html'
		})
		.state('configuration', {
			url: '/examples/configuration',
			controller: 'configurationCtrl',
			templateUrl: 'view/examples/configuration.html'
		})
		.state('contentStrings', {
			url: '/examples/content-strings',
			controller: 'contentStringsCtrl',
			templateUrl: 'view/examples/content-strings.html'
		})
		.state('modelBinding', {
			url: '/examples/model-binding',
			controller: 'modelBindingCtrl',
			templateUrl: 'view/examples/model-binding.html'
		})
		.state('standalone', {
			url: '/examples/standalone',
			controller: 'standaloneCtrl',
			templateUrl: 'view/examples/standalone.html'
		})
		.state('attributes', {
			url: '/attributes',
			controller: 'attributesCtrl',
			templateUrl: 'view/attributes.html'
		})
		.state('icons', {
			url: '/icons',
			controller: 'iconsCtrl',
			templateUrl: 'view/icons.html'
		});
}]);

app.run([
	'$rootScope', 'tplBase', 'srcBase', function ($rootScope, tplBase, srcBase) {
		$rootScope.tplBase = tplBase;

		$rootScope.scripts = [
			{ 'src': 'js/app.js' },
			{ 'src': '../src/js/ng-accordian.js' }
		];
	}
]);

app.controller('gettingStartedCtrl', ['$scope', function ($scope) {
	$scope.intro = 'getting started';
}]);

app.controller('basicCtrl', ['$scope', function ($scope) {

	$scope.tabs = [
		{ 'title': 'Markup', 'url': 'template/accordian/basic/markup.html' }
	];
}]);

app.controller('configurationCtrl', ['$scope', 'tplBase', function ($scope, tplBase) {

	$scope.tabs = [
		{ 'title': 'Markup', 'url': 'template/accordian/configuration/markup.html' },
		{ 'title': 'JavaScript', 'url': 'template/accordian/configuration/javascript.html' }
	];

	$scope.content = [
		{ 'value': tplBase + 'template/accordian/configuration/accordian-content.html' },
		{ 'value': tplBase + 'template/accordian/configuration/accordian-content.html' },
		{ 'value': tplBase + 'template/accordian/configuration/accordian-content.html' }
	];
}]);

app.controller('contentStringsCtrl', ['$scope', function ($scope) {

	$scope.tabs = [
		{ 'title': 'Markup', 'url': 'template/accordian/content-strings/markup.html' },
		{ 'title': 'JavaScript', 'url': 'template/accordian/content-strings/javascript.html' }
	];

	$scope.content = [
		{ 'value': '<p><span>hey, I\'m a string!</span></p>', 'heading': 'cool stuff' },
		{ 'value': '<p><span>hey, I\'m a string!</span></p>', 'heading': 'cool stuff' },
		{ 'value': '<p><span>hey, I\'m a string!</span></p>', 'heading': 'cool stuff' }
	];
}]);

app.controller('modelBindingCtrl', ['$scope', function ($scope) {

	$scope.tabs = [
		{ 'title': 'Markup', 'url': 'template/accordian/model-binding/markup.html' },
		{ 'title': 'Template', 'url': 'template/accordian/model-binding/model-binding-template-display.html' },
		{ 'title': 'JavaScript', 'url': 'template/accordian/model-binding/javascript.html' }
	];

	$scope.content = [
		{ 'value': 'I\'m a model!' },
		{ 'value': 'I\'m a model!' },
		{ 'value': 'I\'m a model!' }
	];
}]);

app.controller('standaloneCtrl', ['$scope', function ($scope) {

	$scope.tabs = [
		{ 'title': 'Markup', 'url': 'template/accordian/standalone/markup.html' }
	];
}]);

app.controller('attributesCtrl', ['$scope', function ($scope) {
}]);

app.controller('iconsCtrl', ['$scope', function ($scope) {
}]);

app.directive('tabs', [function () {
	return {
		restrict: 'E',
		templateUrl: 'template/tabs.html',
		scope: {
			tabs: '=',
			selected: '@'
		},
		link: function (scope, elem, attrs) {

			scope.currentTab = scope.tabs[scope.selected].url;

			scope.onClickTab = function (tab) {
				scope.currentTab = tab.url;
			}

			scope.isActiveTab = function (tabUrl) {
				return tabUrl === scope.currentTab;
			}
		}
	}
}]);

app.directive('prism', [function () {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			elem.ready(function () {
				Prism.highlightElement(elem[0]);
			});
		}
	}
}]);
