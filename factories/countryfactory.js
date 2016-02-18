angular
    .module('countryapp')
    .factory('countrydataservice', countrydataservice)

countrydataservice.$inject = ['$http'];

function countrydataservice($http)
{
    function getData(callback)
    {
        $http({
            method: 'GET',
            url: 'http://rawgit.com/Srini-komman/AngularJS-SVGCharts-ResponsiveDesign/master/countries_top3_population.json',
            cache: true
        }).success(callback)
    }

    return {
        list: getData
    }

}