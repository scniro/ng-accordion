var app = angular.module('app', ['ngAccordion', 'ui.router']);

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
		{ 'title': 'Markup', 'url': 'demo-site/template/accordion/basic/markup.html' },
		{ 'title': 'CSS', 'url': 'demo-site/template/accordion/basic/css.html' }
	];
}]);

app.controller('configurationCtrl', ['$scope', function ($scope) {

	$scope.tabs = [
		{ 'title': 'Markup', 'url': 'demo-site/template/accordion/configuration/markup.html' },
		{ 'title': 'JavaScript', 'url': 'demo-site/template/accordion/configuration/javascript.html' },
		{ 'title': 'CSS', 'url': 'demo-site/template/accordion/configuration/css.html' }
	];

	$scope.content = [
		{ 'value': 'demo-site/template/accordion/configuration/accordion-content.html' },
		{ 'value': 'demo-site/template/accordion/configuration/accordion-content.html' },
		{ 'value': 'demo-site/template/accordion/configuration/accordion-content.html' },
		{ 'value': 'demo-site/template/accordion/configuration/accordion-content.html' }
	];
}]);

app.controller('contentStringsCtrl', ['$scope', function ($scope) {

	$scope.tabs = [
		{ 'title': 'Markup', 'url': 'demo-site/template/accordion/content-strings/markup.html' },
		{ 'title': 'JavaScript', 'url': 'demo-site/template/accordion/content-strings/javascript.html' },
		{ 'title': 'CSS', 'url': 'demo-site/template/accordion/content-strings/css.html' }
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
		{ 'title': 'Markup', 'url': 'demo-site/template/accordion/model-binding/markup.html' },
		{ 'title': 'Template', 'url': 'demo-site/template/accordion/model-binding/model-binding-template-display.html' },
		{ 'title': 'JavaScript', 'url': 'demo-site/template/accordion/model-binding/javascript.html' },
		{ 'title': 'CSS', 'url': 'demo-site/template/accordion/model-binding/css.html' }
	];

	$scope.content = [
		{ 'value': 'I\'m a model!' },
		{ 'value': 'I\'m a model!' },
		{ 'value': 'I\'m a model!' }
	];
}]);

app.controller('disabledCtrl', ['$scope', function ($scope) {

	$scope.tabs = [
		{ 'title': 'Markup', 'url': 'demo-site/template/accordion/disabled/markup.html' },
		{ 'title': 'CSS', 'url': 'demo-site/template/accordion/disabled/css.html' }
	];
}]);

app.controller('methodsCtrl', ['$scope', function ($scope) {

	$scope.tabs = [
			{ 'title': 'Markup', 'url': 'demo-site/template/accordion/methods/markup.html' },
			{ 'title': 'JavaScript', 'url': 'demo-site/template/accordion/methods/javascript.html' }
	];

	$scope.content = [
		{ 'value': '<p><span>stuff</span></p>' },
		{ 'value': '<p><span>stuff</span></p>' },
		{ 'value': '<p><span>stuff</span></p>' }
	];

	$scope.$on('accordion:expand', function (e, index) {
		console.log('accordion:expand ' + index);
	});

	$scope.$on('accordion:expand:animation', function (e, index) {
		console.log('accordion:expand:animation ' + index);
	});

	$scope.$on('accordion:collapse', function (e, index) {
		console.log('accordion:collapse ' + index);
	});

	$scope.$on('accordion:collapse:animation', function (e, index) {
		console.log('accordion:collapse:collapse ' + index);
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

				$scope.$on('myaccordion:expand', function (e, index) {
					terminalbody.append('<span class="console-entry"><span class="pink">myaccordion:expand</span><span> index: </span><span class="blue">' + index + '</span></span>');
					terminal[0].scrollTop = terminal[0].scrollHeight;
				});

				$scope.$on('myaccordion:expand:animation', function (e, index) {
					terminalbody.append('<span class="console-entry"><span class="pink">myaccordion:expand:animation</span><span> index: </span><span class="blue">' + index + '</span></span>');
					terminal[0].scrollTop = terminal[0].scrollHeight;
				});

				$scope.$on('myaccordion:collapse', function (e, index) {
					terminalbody.append('<span class="console-entry"><span class="pink">myaccordion:collpse</span><span> index: </span><span class="blue">' + index + '</span></span>');
					terminal[0].scrollTop = terminal[0].scrollHeight;
				});

				$scope.$on('myaccordion:collapse:animation', function (e, index) {
					terminalbody.append('<span class="console-entry"><span class="pink">myaccordion:collpse:animation</span><span> index: </span><span class="blue">' + index + '</span></span>');
					terminal[0].scrollTop = terminal[0].scrollHeight;
				});

			}
		};
	})();

	$scope.tabs = [
			{ 'title': 'Console', 'url': 'demo-site/template/accordion/callbacks/console.html' },
			{ 'title': 'Markup', 'url': 'demo-site/template/accordion/callbacks/markup.html' },
			{ 'title': 'JavaScript', 'url': 'demo-site/template/accordion/callbacks/javascript.html' }
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

			if (scope.tabs) {
				scope.currentTab = scope.tabs[scope.selected].url;

				scope.onClickTab = function(tab) {
					scope.currentTab = tab.url;
				}

				scope.isActiveTab = function(tabUrl) {
					return tabUrl === scope.currentTab;
				}
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
