function init() {

	function NgAccordionException(message) {
		this.name = 'NgAccordionException';
		this.message = message;
	}

	NgAccordionException.prototype = new Error();
	NgAccordionException.prototype.constructor = NgAccordionException;

	angular.module('ngAccordion', [])
	.factory('accordionStyleFactory', [function () {
		function getStyle(code) {

			switch (code) {
				case 'chevron':
					this.style =
						'<div class="icon chevron" ' +
							'ng-style="{\'width\': height + \'px\', \'transition\': \'transform \' + timing + \'ms\'}" ' +
							'ng-class="{\'open\': toggle}">' +
							'<div ng-style="{\'border-bottom-width\': (height / 12) + \'px\',  \'border-right-width\': (height / 12) + \'px\'}"></div>' +
						'</div>';
					break;
				case 'plus':
					this.style =
						'<div class="icon plus" ' +
							'ng-style="{\'width\': ((height * 0.67) | number: 0 ) + \'px\', \'padding\': (height / 6) + \'px\', \'transition\': \'transform \' + timing + \'ms\'}" ' +
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
	.directive('accordion', ['accordionStyleFactory', '$timeout', function (accordionStyleFactory, $timeout) {
		return {
			restrict: 'E',
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

						if (scope.timing)
							$timeout(function () { scope.$root[attrs.handle].$emit(attrs.handle + ':collapse:animation', index); }, scope.timing);
					}

					function onExpand(index) {
						scope.$root[attrs.handle].$emit(attrs.handle + ':expand', index);
						if (scope.timing)
							$timeout(function () { scope.$root[attrs.handle].$emit(attrs.handle + ':expand:animation', index); }, scope.timing);
					}

					scope.collapse = function (index) {

						if (index || index === 0) {
							angular.element(angular.element(elem.children()[index]).children()[1]).scope().toggle = false;
						} else {
							angular.forEach(elem.children().children(), function (value) {
								angular.element(value).scope().toggle = false;
							});
						}

						return onCollapse(index);
					}

					scope.disable = function (index) {
						if (index) {
							scope.collapse(index);
							angular.element(elem.children()[index]).addClass('disabled');
						}
							
						else {
							scope.collapse();
							angular.forEach(elem.children(), function(value) {
								angular.element(value).addClass('disabled');
							});
						}
					}

					scope.enable = function (index) {
						if (index) {
							angular.element(elem.children()[index]).removeClass('disabled');
						}
						
						else {
							angular.forEach(elem.children(), function(value) {
								angular.element(value).removeClass('disabled');
							});
						}
					}

					scope.expand = function (index) {
						if (index || index === 0) {
							var elements = angular.element(angular.element(elem.children()[index]).children());

							if (!angular.element(elements[0]).parent().hasClass('disabled'))
								angular.element(elements[1]).scope().toggle = true;
						} else {
							angular.forEach(elem.children().children(), function (value) {
								if (!angular.element(value).parent().hasClass('disabled'))
									angular.element(value).scope().toggle = true;
							});
						}

						return onExpand(index);
					}

					scope.handler = { 'onCollapse': onCollapse, 'onExpand': onExpand };
				}
			},
			controller: ['$scope', function ($scope) {

				var index = -1;

				this.getConfiguration = function () {
					return {
						'closeOthers': JSON.parse($scope.closeOthers || false) || false,
						'toggleIcon': accordionStyleFactory.getStyle($scope.toggleIcon || 0),
						'timing': $scope.timing,
						'callback': $scope.callback,
						'index': index += 1
					}
				}

				this.getHandler = function () {
					return $scope.handler;
				}
			}]
		}
	}])
	.directive('toggle', ['$compile', 'accordionStyleFactory', '$timeout', function ($compile, accordionStyleFactory, $timeout) {
		return {
			restrict: 'E',
			scope: {
				content: '=',
				contentUrl: '=',
				model: '=',
				heading: '='
			},
			require: ['^accordion', '?^ngModel'],
			link: function (scope, elem, attrs, parent) {

				if (parent[1] && !attrs.modelName)
					throw new NgAccordionException('ngAccordion: ng-model requires attribute model-name to be specified.');

				var config = parent[0].getConfiguration();

				var handle = parent[0].getHandler();

				if (parent[1]) {
					$timeout(function () {
						scope[attrs.modelName] = parent[1].$modelValue;
					});
				}

				elem.css('display', 'block');

				var content = scope.contentUrl ? '<div style="overflow: hidden" ng-include="contentUrl" class="toggle-body"></div>' : '<div style="overflow: hidden" ng-html="content" class="toggle-body"></div>';

				var heading = scope.heading ? '<span ng-style="{\'font-size\': (height * 0.50 | number: 0) + \'px\'}">' + scope.heading + '</span>' : '';

				var tpl =
				'<div class="toggle-header" ng-click="toggleBody()" ng-class="{\'open\': toggle}">' +
					config.toggleIcon + heading +
				'</div>' +
				'<div>' +
					content +
				'</div>';

				elem.append(angular.element(tpl));

				$compile(elem.contents())(scope);

				scope.height = elem[0].firstChild.clientHeight;

				scope.timing = config.timing ? config.timing : attrs.timing;

				scope.toggleBody = function () {

					if (!elem.hasClass('disabled')) {
						var closing = scope.toggle ? false : true;

						if (config.closeOthers) {
							angular.forEach(elem.parent().children().children(), function (value, i) {
								angular.element(value).scope().toggle = false;
							});
						}

						scope.toggle = closing;

						if (handle)
							return scope.toggle ? handle.onExpand(config.index) : handle.onCollapse(config.index);
					}
				}
			}
		}
	}])
	.directive('toggleBody', ['$timeout', function ($timeout) {
		return {
			restrict: 'C',
			link: function (scope, elem, attrs) {

				scope.$watch('toggle', function (n, o) {

					var css = n ? { 'max-height': elem[0].scrollHeight + 'px', 'transition': 'max-height ' + scope.timing + 'ms' } : { 'max-height': 0, 'transition': 'max-height ' + scope.timing + 'ms' }
					elem.css(css);

					if (n) {
						elem.addClass('border').css('border-top', '0');
					} else {
						$timeout(function () {
							elem.removeClass('border');
						}, scope.timing);
					}
				});
			}
		}
	}])
	.directive('ngHtml', ['$compile', function ($compile) {
		return {
			restrict: 'A',
			link: function (scope, elem, attrs) {
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
			}
		}	
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