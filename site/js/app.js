
var app = angular.module('app', ['ngAccordian', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.html5Mode({
		enabled: true
	});

	$stateProvider
		.state('home', {
			url: '/',
			controller: 'ctrl',
			templateUrl: 'view/home.html'
		})
		.state('basic', {
			url: '/basic',
			controller: 'ctrl',
			templateUrl: 'view/basic.html'
		})
		.state('configuration', {
			url: '/configuration',
			controller: 'ctrl',
			templateUrl: 'view/configuration.html'
		});
});


app.controller('ctrl', function ($scope) {
	$scope.content = [
        { 'value': '/views/demo-content.html' },
        { 'value': '/views/demo-content.html' },
        { 'value': '/views/demo-content.html' }
	];

	$scope.staticContent = [
        { 'value': '<span> er </span>' },
        { 'value': '<span> um </span>' },
        { 'value': '<span> eh </span>' }
	];

	$scope.values = [
        {
        	'name': 'bob',
        	'age': 20
        }, {
        	'name': 'susy',
        	'age': 24
        }, {
        	'name': 'daisy',
        	'age': 26
        }
	];

	$scope.scopeContent = '<span>yo {{ o.name }}</span>';

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

app.directive('prism', [
		function () {
			return {
				restrict: 'A',
				link: function ($scope, element, attrs) {
					element.ready(function () {

						Prism.highlightElement(element[0]);
					});
				}
			}
		}
]);

