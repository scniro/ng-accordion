var app = angular.module('app', ['ngAccordian']);

app.controller('ctrl', function($scope) {
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
});

