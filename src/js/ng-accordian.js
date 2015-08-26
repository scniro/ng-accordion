
function init() {
    angular.module('ngAccordian', [])
        .factory('accordianStyleFactory', [function () {

            (function () {
                var css = '.plus div { width: 50%; height: 50%; float: left; box-sizing: border-box; } .chevron { position: relative; box-sizing: border-box; }',
                    head = document.head || document.getElementsByTagName('head')[0],
                    style = document.createElement('style');

                style.type = 'text/css';
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }

                head.appendChild(style);
            }());

            function getStyle(code) {
                switch (code) {
                    case 'chevron': this.style = '<div class="chevron" ng-style="{\'width\': height + \'px\'}" style="height: 100%;" ng-class="{\'open\': toggle}"><div class="chevron" style="height: 50%; width: 50%; left: 25%; top: 25%"></div></div>';
                        break;
                    case 'plus':
                        this.style = '<div class="plus" ng-style="{\'height\':  ((height * 0.67) | number: 0 ) + \'px\', \'width\':  ((height * 0.67) | number: 0 ) + \'px\', \'padding\': (height / 6) + \'px\'}" ng-class="{\'open\': toggle}"><div></div><div></div><div></div><div></div></div>';
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
        .directive('accordian', ['accordianStyleFactory', function (accordianStyleFactory) {
            return {
                scope: {
                    closeOthers: '@',
                    toggleIcon: '@'
                },
                controller: function ($scope) {
                    this.getConfiguration = function () {
                        return {
                            'closeOthers': JSON.parse($scope.closeOthers || false) || false,
                            'toggleIcon': accordianStyleFactory.getStyle($scope.toggleIcon || 0)
                        }
                    }
                }
            }
        }])
        .directive('toggle', ['$compile', 'accordianStyleFactory', '$timeout', function ($compile, accordianStyleFactory, $timeout) {
            return {
                scope: {
                    content: '@',
                    contentUrl: '@',
                    toggleIcon: '@'
                },
                require: '?^accordian',
                link: function (scope, elem, attrs, parent) {

                    var config = parent ? parent.getConfiguration() : {};

                    elem.css('display', 'block');

                    var style = scope.toggleIcon ? accordianStyleFactory.getStyle(scope.toggleIcon) : parent ? config.toggleIcon : '';

                    var content = scope.contentUrl ? '<div style="overflow: hidden" ng-include="contentUrl" class="toggle-body"></div>' : '<div style="overflow: hidden" ng-html="content" class="toggle-body"></div>';

                    var tpl =
                        '<div class="toggle-header" ng-click="toggleBody()">' +
                            style +
                        '</div>' +
                        '</div>' +
                            '<div ng-class="{\'open\': toggle}">' +
                            content +
                        '</div>';

                    elem.append(angular.element(tpl));

                    $compile(elem.contents())(scope);

                    scope.height = elem[0].firstChild.clientHeight;

                    scope.toggleBody = function () {
                        if (!scope.toggle && (config.closeOthers)) {
                            scope.$parent.$broadcast('close', scope.toggle);
                        }

                        scope.toggle = scope.toggle ? false : true;
                    }

                    scope.$on('close', function (event, toggle) {
                        scope.toggle = toggle;
                    });
                }
            }
        }])
        .directive('toggleBody', [function () {
            return {
                restrict: 'C',
                link: function (scope, elem, attrs) {

                    scope.$watch('toggle', function (n, o) {
                        var css = n ? { 'max-height': elem[0].scrollHeight + 'px', 'transition': 'all .2s ease-out' } : { 'max-height': 0, 'transition': 'all .2s ease-out' }
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