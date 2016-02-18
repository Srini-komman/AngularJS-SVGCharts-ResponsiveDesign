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
            url: 'http://localhost/AngularJS_SVG_Charts_Responsive/countries_top3_population.json',
            cache: true
        }).success(callback)
    }

    return {
        list: getData
    }

}