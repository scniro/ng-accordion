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
					this.style =
						'<div class="icon chevron" ' +
							'ng-style="{\'width\': height + \'px\', \'transition\': \'transform \' + timing + \' ease\'}" ' +
							'ng-class="{\'open\': toggle}">' +
							'<div ng-style="{\'border-bottom-width\': (height / 12) + \'px\',  \'border-right-width\': (height / 12) + \'px\'}"></div>' +
						'</div>';
					break;
				case 'plus':
					this.style =
						'<div class="icon plus" ' +
							'ng-style="{\'width\': ((height * 0.67) | number: 0 ) + \'px\', \'padding\': (height / 6) + \'px\', \'transition\': \'transform \' + timing + \' ease\'}" ' +
							'ng-class="{\'open\': toggle}">' +
								'<div ng-style="{\'border-bottom-width\': (height / 24 | number: 0) + \'px\', \'border-right-width\': (height / 24 | number: 0) + \'px\' }"></div>' +
								'<div ng-style="{\'border-bottom-width\': (height / 24 | number: 0) + \'px\', \'border-left-width\':  (height / 24 | number: 0) + \'px\' }"></div>' +
								'<div ng-style="{\'border-top-width\':    (height / 24 | number: 0) + \'px\', \'border-right-width\': (height / 24 | number: 0) + \'px\' }"></div>' +
								'<div ng-style="{\'border-top-width\':    (height / 24 | number: 0) + \'px\', \'border-left-width\':  (height / 24 | number: 0) + \'px\' }"></div>' +
						'</div>';
					break;
				default:
					this.style = '';
			}

			return this.style;
		};

		return {
			getStyle: getStyle
		}
	}])
	.directive('accordian', ['accordianStyleFactory', function (accordianStyleFactory) {
		return {
			scope: {
				closeOthers: '@',
				toggleIcon: '@',
				timing: '@'
			},
			link: function (scope, elem, attrs) {
				if (attrs.handle) {
					scope.$root[attrs.handle] = scope;

					function onCollapse(index) {
						scope.$root[attrs.handle].$emit(attrs.handle + ':collapse', index);
					}

					function onExpand(index) {

						scope.$root[attrs.handle].$emit(attrs.handle + ':expand', index);
					}

					scope.collapse = function (index) {
						if (index) {
							angular.element(elem.children().children()[index]).scope().toggle = false;
						} else {
							angular.forEach(elem.children().children(), function (value) {
								angular.element(value).scope().toggle = false;
							});
						}

						return onCollapse(index);
					}

					scope.expand = function (index) {
						if (index) {
							angular.element(elem.children().children()[index]).scope().toggle = true;
						} else {
							angular.forEach(elem.children().children(), function (value) {
								angular.element(value).scope().toggle = true;
							});
						}

						return onExpand(index);
					}

					scope.handler = {
						'onCollapse': onCollapse,
						'onExpand': onExpand
					}
				}
			},
			controller: ['$scope', function ($scope) {
				this.getConfiguration = function () {
					return {
						'closeOthers': JSON.parse($scope.closeOthers || false) || false,
						'toggleIcon': accordianStyleFactory.getStyle($scope.toggleIcon || 0),
						'timing': $scope.timing,
						'callback': $scope.callback
					}
				}

				this.getHandler = function () {
					return $scope.handler;
				}
			}]
		}
	}])
	.directive('toggle', ['$compile', 'accordianStyleFactory', '$timeout', function ($compile, accordianStyleFactory, $timeout) {
		return {
			scope: {
				content: '=',
				contentUrl: '=',
				toggleIcon: '@',
				model: '=',
				heading: '='
			},
			require: ['?^accordian', '?^ngModel'],
			link: function (scope, elem, attrs, parent) {

				if (attrs.handle) {

					scope.$root[attrs.handle] = scope;

					function onCollapse() {
						scope.$root[attrs.handle].$emit(attrs.handle + ':collapse');
					}

					function onExpand() {
						scope.$root[attrs.handle].$emit(attrs.handle + ':expand');
					}

					this.handler = {
						'onCollapse': onCollapse,
						'onExpand': onExpand
					}

					scope.collapse = function () {
						scope.toggle = false;
						return onCollapse();
					}

					scope.expand = function () {
						scope.toggle = true;
						return onExpand();
					}
				}

				if (parent[1] && !attrs.modelName) {
					throw new NgAccordianException('ngAccordian: ng-model requires attribute model-name to be specified.');
				}

				scope.config = parent[0] ? parent[0].getConfiguration() : {};

				scope.handler = parent[0] ? parent[0].getHandler() : attrs.handle ? this.handler : null;

				if (parent[1]) {
					$timeout(function () {
						scope[attrs.modelName] = parent[1].$modelValue;
					});
				}

				elem.css('display', 'block');

				var style = scope.toggleIcon ? accordianStyleFactory.getStyle(scope.toggleIcon) : parent[0] ? scope.config.toggleIcon : '';

				var content = scope.contentUrl ? '<div style="overflow: hidden" ng-include="contentUrl" class="toggle-body"></div>' : '<div style="overflow: hidden" ng-html="content" class="toggle-body"></div>';

				var heading = scope.heading ? '<span ng-style="{\'font-size\': (height * 0.50 | number: 0) + \'px\'}">' + scope.heading + '</span>' : '';

				var tpl =
				'<div class="toggle-header" ng-click="toggleBody($event)" >' +
					style + heading +
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

					if (scope.config.closeOthers) {
						var toggle = angular.element($event.currentTarget).parent();

						var accordian = toggle.parent();

						if (accordian[0].nodeName.toUpperCase() === 'ACCORDIAN') {
							angular.forEach(accordian.children().children(), function (value) {
								angular.element(value).scope().toggle = false;
							});
						}
					}

					scope.toggle = closing;

					if (scope.handler) {
						scope.toggle ? scope.handler.onExpand() : scope.handler.onCollapse();
					}
				}
			}
		}
	}])
	.directive('toggleBody', ['$timeout', function ($timeout) {
		return {
			restrict: 'C',
			link: function (scope, elem, attrs) {

				function transitionToMilliseconds(value) {
					var num = parseFloat(value, 10),
						unit = value.match(/m?s/),
						milliseconds;

					if (unit)
						unit = unit[0];

					switch (unit) {
						case 's': milliseconds = num * 1000; break;
						case 'ms': milliseconds = num; break;
						default: milliseconds = 0; break;
					}

					return milliseconds;
				}

				scope.$watch('toggle', function (n, o) {

					if (!scope.transition && scope.timing) {
						scope.transition = transitionToMilliseconds(scope.timing);
					}

					var css = n ? { 'max-height': elem[0].scrollHeight + 'px', 'transition': 'max-height ' + scope.timing + ' ease-out' } : { 'max-height': 0, 'transition': 'max-height ' + scope.timing + ' ease-out' }
					elem.css(css);

					if (n) {
						elem.addClass('border').css('border-top', '0');
					} else {
						$timeout(function () {
							elem.removeClass('border');
						}, scope.transition);
					}
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
	if (typeof define === 'function' && define.amd) { // RequireJS aware
		define(['angular'], function () {
			init();
		});
	} else {
		init();
	}
}());