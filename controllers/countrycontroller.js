angular
    .module('countryapp')
    .controller('CountryController', CountryController);

CountryController.$inject = ['$scope','countrydataservice'];

function CountryController($scope, countrydataservice) {
    $scope.barColours = ["#F7464A", "#FDB45C", "#97BBCD"];
    $scope.height = 245;
    $scope.width = 350;
    countrydataservice.list(function (data) {
        $scope.datacountries = data;
        $scope.itemscount = data.length;
    });
}