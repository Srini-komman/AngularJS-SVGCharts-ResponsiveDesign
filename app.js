angular
    .module('countryapp', ['ngRoute'])
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/countries-population.html',
            controller: 'CountryController'
        })
        .otherwise({
            redirectTo: '/'
        })
}
