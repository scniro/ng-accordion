var app = angular.module('app', ['ngAccordian', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

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
			url: '/basic',
			controller: 'basicCtrl',
			templateUrl: 'view/basic.html'
		})
		.state('configuration', {
			url: '/configuration',
			controller: 'configurationCtrl',
			templateUrl: 'view/configuration.html'
		});
});

app.controller('gettingStartedCtrl', function ($scope) {
	$scope.intro = 'getting started';
});

app.controller('basicCtrl', function ($scope) {

	$scope.basic = [
		{
			title: 'Markup',
			url: 'template/accordian/basic/markup.html'
		}, {
			title: 'JavaScript',
			url: 'template/accordian/basic/javascript.html'
		}
	];
});

app.controller('configurationCtrl', function ($scope) {

	$scope.configuration = [
		{
			title: 'Markup',
			url: 'template/accordian/configuration/markup.html'
		}, {
			title: 'JavaScript',
			url: 'template/accordian/configuration/javascript.html'
		}
	];
});

app.directive('tabs', ['$http', function ($http) {
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
		link: function ($scope, element, attrs) {
			element.ready(function () {
				Prism.highlightElement(element[0]);
			});
		}
	}
}]);

