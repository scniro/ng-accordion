function init() {

	function NgAccordianException(message) {
		this.name = 'NgAccordianException';
		this.message = message;
	}

	NgAccordianException.prototype = new Error();
	NgAccordianException.prototype.constructor = NgAccordianException;

	angular.module('ngAccordian', [])
	.factory('accordianStyleFactory', [function () {

		function getStyle(code) {

			switch (code) {
				case 'chevron':
					this.style = '<div class="chevron" ng-style="{\'width\': height + \'px\', \'transition\': \'all \' + timing + \' linear\'}" style="height: 100%;" ng-class="{\'open\': toggle}"><div class="chevron" style="height: 50%; width: 50%; left: 25%; top: 25%"></div></div>';
					break;
				case 'plus':
					this.style = '<div class="plus" ng-style="{\'width\':  ((height * 0.67) | number: 0 ) + \'px\', \'padding\': (height / 6) + \'px\'}"  style="height: 66.6667%" ng-class="{\'open\': toggle}"><div></div><div></div><div></div><div></div></div>';
					break;
				default:
					this.style = '';
					break;
			}

			return this.style;
		};

		return {
			getStyle: getStyle
		}
	}])
	.directive('accordian', ['accordianStyleFactory', '$timeout', function (accordianStyleFactory, $timeout) {
		return {
			scope: {
				closeOthers: '@',
				toggleIcon: '@',
				timing: '@'
			},
			controller: ['$scope', function ($scope) {

				this.getConfiguration = function () {
					return {
						'closeOthers': JSON.parse($scope.closeOthers || false) || false,
						'toggleIcon': accordianStyleFactory.getStyle($scope.toggleIcon || 0),
						'timing': $scope.timing
					}
				}
			}]
		}
	}])
	.directive('toggle', ['$compile', 'accordianStyleFactory', '$timeout', function ($compile, accordianStyleFactory, $timeout) {
		return {
			scope: {
				content: '@',
				contentUrl: '=',
				toggleIcon: '@',
				modelName: '@'
			},
			require: ['?^accordian', '?^ngModel'],
			link: function (scope, elem, attrs, parent) {

				if (parent[1] && !scope.modelName) {
					throw new NgAccordianException('ngAccordian: ng-model requires attribute model-name to be specified.');
				}

				scope.config = parent[0] ? parent[0].getConfiguration() : {};

				if (parent[1]) {
					$timeout(function () {
						scope[scope.modelName] = parent[1].$modelValue;
					});
				}

				elem.css('display', 'block');

				var style = scope.toggleIcon ? accordianStyleFactory.getStyle(scope.toggleIcon) : parent[0] ? scope.config.toggleIcon : '';

				var content = scope.contentUrl ? '<div style="overflow: hidden" ng-include="contentUrl" class="toggle-body"></div>' : '<div style="overflow: hidden" ng-html="content" class="toggle-body"></div>';

				var tpl =
				'<div class="toggle-header" ng-click="toggleBody($event)" >' + //ng-class="{\'open\': toggle}"
					style +
				'</div>' +
				'</div>' +
					'<div ng-class="{\'open\': toggle}">' +
				'<div>' +
					content +
				'</div>';

				elem.append(angular.element(tpl));

				$compile(elem.contents())(scope);

				scope.height = elem[0].firstChild.clientHeight;

				scope.timing = scope.config.timing ? scope.config.timing : attrs.timing;

				scope.toggleBody = function ($event) {

					$event.stopPropagation();

					var closing = scope.toggle ? false : true;

					var toggle = angular.element($event.currentTarget).parent();

					var accordian = toggle.parent();
					
					if (accordian[0].nodeName === 'ACCORDIAN') {
						angular.forEach(accordian.children().children(), function (value) {
							angular.element(value).scope().toggle = false;
						});
					}

					scope.toggle = closing;
				}
			}
		}
	}])
	.directive('toggleBody', [function () {
		return {
			restrict: 'C',
			link: function (scope, elem, attrs) {

				scope.$watch('toggle', function (n, o) {
					var css = n ? { 'max-height': elem[0].scrollHeight + 'px', 'transition': 'all ' + scope.$parent.timing + ' ease-out' } : { 'max-height': 0, 'transition': 'all ' + scope.$parent.timing + ' ease-out' }
					elem.css(css);
				});
			}
		}
	}])
	.directive('ngHtml', ['$compile', function ($compile) {
		return function (scope, elem, attrs) {
			if (attrs.ngHtml) {
				elem.html(scope.$eval(attrs.ngHtml));
				$compile(elem.contents())(scope);
			}
			scope.$watch(attrs.ngHtml, function (newValue, oldValue) {
				if (newValue && newValue !== oldValue) {
					elem.html(newValue);
					$compile(elem.contents())(scope);
				}
			});
		};
	}]);
}

(function () {
	if (typeof define === 'function' && define.amd) {
		define(['angular'], function () {
			init();
		});
	} else {
		init();
	}
}());