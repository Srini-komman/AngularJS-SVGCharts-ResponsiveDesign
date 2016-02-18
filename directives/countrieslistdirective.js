angular
    .module('countryapp')
    .directive('countryPopulation', countryPopulation)


function countryPopulation()
{
    var controller = ['$scope', function () {
        $scope.reverse = true;
        $scope.sortField = 'population';
    }];

    return {
        restrict: 'E',
        //scope: {
        //    countrylist: '=countrylist'
        //},
        templateUrl: 'templates/coutrylistTemplate.html'
    }
}