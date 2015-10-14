var app = angular.module('app', ['ngAccordian', 'ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.html5Mode({
		enabled: true
	});

	$stateProvider
		.state('home', {
			url: '/',
			controller: 'gettingStartedCtrl',
			templateUrl: 'demo-site/view/getting-started.html'
		})
		.state('basic', {
			url: '/examples/basic',
			controller: 'basicCtrl',
			templateUrl: 'demo-site/view/examples/basic.html'
		})
		.state('configuration', {
			url: '/examples/configuration',
			controller: 'configurationCtrl',
			templateUrl: 'demo-site/view/examples/configuration.html'
		})
		.state('contentStrings', {
			url: '/examples/content-strings',
			controller: 'contentStringsCtrl',
			templateUrl: 'demo-site/view/examples/content-strings.html'
		})
		.state('modelBinding', {
			url: '/examples/model-binding',
			controller: 'modelBindingCtrl',
			templateUrl: 'demo-site/view/examples/model-binding.html'
		})
		.state('disabled', {
			url: '/examples/disabled',
			controller: 'disabledCtrl',
			templateUrl: 'demo-site/view/examples/disabled.html'
		})
		.state('methods', {
			url: '/methods',
			controller: 'methodsCtrl',
			templateUrl: 'demo-site/view/methods.html'
		})
		.state('callbacks', {
			url: '/callbacks',
			controller: 'callbacksCtrl',
			templateUrl: 'demo-site/view/callbacks.html'
		})
		.state('attributes', {
			url: '/attributes',
			controller: 'attributesCtrl',
			templateUrl: 'demo-site/view/attributes.html'
		})
		.state('icons', {
			url: '/icons',
			controller: 'iconsCtrl',
			templateUrl: 'demo-site/view/icons.html'
		});
}]);

app.controller('gettingStartedCtrl', ['$scope', function ($scope) {
	$scope.intro = 'getting started';
}]);

app.controller('basicCtrl', ['$scope', function ($scope) {

	$scope.tabs = [
		{ 'title': 'Markup', 'url': 'demo-site/template/accordian/basic/markup.html' },
		{ 'title': 'CSS', 'url': 'demo-site/template/accordian/basic/css.html' }
	];
}]);

app.controller('configurationCtrl', ['$scope', function ($scope) {

	$scope.tabs = [
		{ 'title': 'Markup', 'url': 'demo-site/template/accordian/configuration/markup.html' },
		{ 'title': 'JavaScript', 'url': 'demo-site/template/accordian/configuration/javascript.html' },
		{ 'title': 'CSS', 'url': 'demo-site/template/accordian/configuration/css.html' }
	];

	$scope.content = [
		{ 'value': 'demo-site/template/accordian/configuration/accordian-content.html' },
		{ 'value': 'demo-site/template/accordian/configuration/accordian-content.html' },
		{ 'value': 'demo-site/template/accordian/configuration/accordian-content.html' },
		{ 'value': 'demo-site/template/accordian/configuration/accordian-content.html' }
	];
}]);

app.controller('contentStringsCtrl', ['$scope', function ($scope) {

	$scope.tabs = [
		{ 'title': 'Markup', 'url': 'demo-site/template/accordian/content-strings/markup.html' },
		{ 'title': 'JavaScript', 'url': 'demo-site/template/accordian/content-strings/javascript.html' },
		{ 'title': 'CSS', 'url': 'demo-site/template/accordian/content-strings/css.html' }
	];

	$scope.content = [
		{ 'value': '<p><span>hey, I\'m a string!</span></p>', 'heading': 'cool stuff' },
		{ 'value': '<p><span>hey, I\'m a string!</span></p>', 'heading': 'cool stuff' },
		{ 'value': '<p><span>hey, I\'m a string!</span></p>', 'heading': 'cool stuff' },
		{ 'value': '<p><span>hey, I\'m a string!</span></p>', 'heading': 'cool stuff' },
		{ 'value': '<p><span>hey, I\'m a string!</span></p>', 'heading': 'cool stuff' },
		{ 'value': '<p><span>hey, I\'m a string!</span></p>', 'heading': 'cool stuff' }
	];
}]);

app.controller('modelBindingCtrl', ['$scope', function ($scope) {

	$scope.tabs = [
		{ 'title': 'Markup', 'url': 'demo-site/template/accordian/model-binding/markup.html' },
		{ 'title': 'Template', 'url': 'demo-site/template/accordian/model-binding/model-binding-template-display.html' },
		{ 'title': 'JavaScript', 'url': 'demo-site/template/accordian/model-binding/javascript.html' },
		{ 'title': 'CSS', 'url': 'demo-site/template/accordian/model-binding/css.html' }
	];

	$scope.content = [
		{ 'value': 'I\'m a model!' },
		{ 'value': 'I\'m a model!' },
		{ 'value': 'I\'m a model!' }
	];
}]);

app.controller('disabledCtrl', ['$scope', function ($scope) {

	$scope.tabs = [
		{ 'title': 'Markup', 'url': 'demo-site/template/accordian/disabled/markup.html' },
		{ 'title': 'CSS', 'url': 'demo-site/template/accordian/disabled/css.html' }
	];
}]);

app.controller('methodsCtrl', ['$scope', function ($scope) {

	$scope.tabs = [
			{ 'title': 'Markup', 'url': 'demo-site/template/accordian/methods/markup.html' },
			{ 'title': 'JavaScript', 'url': 'demo-site/template/accordian/methods/javascript.html' }
	];

	$scope.content = [
		{ 'value': '<p><span>stuff</span></p>' },
		{ 'value': '<p><span>stuff</span></p>' },
		{ 'value': '<p><span>stuff</span></p>' }
	];

	$scope.$on('accordian:expand', function (e, index) {
		console.log('accordian:expand ' + index);
	});

	$scope.$on('accordian:expand:animation', function (e, index) {
		console.log('accordian:expand:animation ' + index);
	});

	$scope.$on('accordian:collapse', function (e, index) {
		console.log('accordian:collapse ' + index);
	});

	$scope.$on('accordian:collapse:animation', function (e, index) {
		console.log('accordian:collapse:collapse ' + index);
	});
}]);

app.controller('callbacksCtrl', ['$scope', '$interval', '$timeout', function ($scope, $interval, $timeout) {

	var registerCallbacks = (function () {
		var executed = false;
		return function () {
			if (!executed) {
				executed = true;

				var terminal = angular.element(document.getElementById('console'));

				var terminalbody = angular.element(document.getElementById('console-entries'));

				$scope.$on('myAccordian:expand', function (e, index) {
					terminalbody.append('<span class="console-entry"><span class="pink">myAccordian:expand</span><span> index: </span><span class="blue">' + index + '</span></span>');
					terminal[0].scrollTop = terminal[0].scrollHeight;
				});

				$scope.$on('myAccordian:expand:animation', function (e, index) {
					terminalbody.append('<span class="console-entry"><span class="pink">myAccordian:expand:animation</span><span> index: </span><span class="blue">' + index + '</span></span>');
					terminal[0].scrollTop = terminal[0].scrollHeight;
				});

				$scope.$on('myAccordian:collapse', function (e, index) {
					terminalbody.append('<span class="console-entry"><span class="pink">myAccordian:collpse</span><span> index: </span><span class="blue">' + index + '</span></span>');
					terminal[0].scrollTop = terminal[0].scrollHeight;
				});

				$scope.$on('myAccordian:collapse:animation', function (e, index) {
					terminalbody.append('<span class="console-entry"><span class="pink">myAccordian:collpse:animation</span><span> index: </span><span class="blue">' + index + '</span></span>');
					terminal[0].scrollTop = terminal[0].scrollHeight;
				});

			}
		};
	})();

	$scope.tabs = [
			{ 'title': 'Console', 'url': 'demo-site/template/accordian/callbacks/console.html' },
			{ 'title': 'Markup', 'url': 'demo-site/template/accordian/callbacks/markup.html' },
			{ 'title': 'JavaScript', 'url': 'demo-site/template/accordian/callbacks/javascript.html' }
	];

	$scope.content = [
		{ 'value': '<p><span>stuff</span></p>' },
		{ 'value': '<p><span>stuff</span></p>' },
		{ 'value': '<p><span>stuff</span></p>' }
	];


	$scope.$watch(function() {
		return angular.element(document.getElementById('console')).html();
	}, function (n, o) {
		if(n && n!== o)
			registerCallbacks();
	});
}]);

app.controller('attributesCtrl', ['$scope', function ($scope) {
}]);

app.controller('iconsCtrl', ['$scope', function ($scope) {
}]);

app.directive('tabs', [function () {
	return {
		restrict: 'E',
		templateUrl: 'demo-site/template/tabs.html',
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
