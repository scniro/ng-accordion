var app = angular.module('app', ['ngAccordian']);

app.controller('ctrl', function ($scope) {
    $scope.content = [
        { 'value': '/views/demo-content.html' },
        { 'value': '/views/demo-content.html' },
        { 'value': '/views/demo-content.html' }
    ];

    $scope.content2 = [
        { 'value': '<span>yo!</span>' },
        { 'value': '<span>yo!</span>' },
        { 'value': '<span>yo!</span>' }
    ];
});

