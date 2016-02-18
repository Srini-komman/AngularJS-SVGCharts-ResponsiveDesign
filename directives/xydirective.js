var chart = angular.module('countryapp');
       
angular.forEach(['x1', 'x2', 'y1', 'y2', 'x', 'y', 'width'], function (name) {
    var ngName = 'sg' + name[0].toUpperCase() + name.slice(1);
    chart.directive(ngName, function () {
        return function (scope, element, attrs) {
            attrs.$observe(ngName, function (value) {
                attrs.$set(name, value);
            })
        };
    });
})
