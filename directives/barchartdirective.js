
angular
    .module('countryapp')
    .directive('barChart', barChart)

function barChart() {
    var controller = ['$scope', function($scope){
        $scope.$watch('countrylist', function (n) {
            $scope.noDataPlaceHolder = '';
            $scope.xAxis = [];
            $scope.y2 = $scope.height-60;
            $scope.x1 = 40;
            $scope.x2 = 300;
            if (!$scope.countrylist) {
                return;
            }

            var xTopBar = 100;
            if ($scope.countrylist.length > 0) {
                xTopBar = Math.max.apply(Math, $scope.countrylist.map(function (o) { return o.population; }))
                xTopBar = ((xTopBar % 100) > 0) ? xTopBar - (xTopBar % 100) + 100 : xTopBar;
            }
            else {
                $scope.noDataPlaceHolder = 'No data available'
                return;
            }

            var unit = xTopBar / 5;
            var nextRound = 100;

            var xValue = 0;
            for (var i = 0; i < 6; i++) {
                $scope.xAxis.push(xValue);
                xValue = xValue + unit;
                if (unit > 100) {
                    xValue = ((xValue % nextRound) > 0) ? xValue - (xValue % nextRound) + nextRound : xValue;
                } else {
                    xValue = Math.round(xValue);
                }
            }
            //$scope.xAxis.reverse();

            $scope.getItemValue = function (value) {
                return value / $scope.xAxis[0] * 100;
            }

            $scope.getBarWidth = function (value) {
                var percent = (value / $scope.xAxis[$scope.xAxis.length - 1]) * 100;
                return (($scope.x2 - $scope.x1) / 100) * percent;
            }

            $scope.getXPosition = function()
            {

            }

                
        })
    }],

    template = '<button ng-click="addItem()">Add Item</button><ul>' +
                 '<li ng-repeat="item in items">{{ ::item.name }}</li></ul>';

    return{
        restrict: 'E',
        replace: true,
        transclude: true,
        scope:{
            countrylist: '=countrylist',
            colors: '=colors',
            height: '=height',
            width: '=width'
        },
        templateUrl: 'chart/bar',
        controller: controller
    }
};

angular.module('countryapp').run(['$templateCache', function ($templateCache) {
    var template = "<div class='bar-graph'>\
        <div class='bar-graph-body clearfix'>{{noDataPlaceHolder}}\
            <div style='height:{{height}}px; width:{{width}}px;'>\
                <svg class='graph'>\
                    <g class='grid x-grid' id='xGrid'>\
                        <line sg-x1='{{x1}}' sg-x2='{{x1}}' sg-y1='5' sg-y2='{{y2}}'></line>\
                        <g ng-repeat='country in countrylist'>\
                            <g>\
                                <image xlink:href='{{country.flagURL}}' width='50' height='20' sg-x='{{x1-50}}' sg-y='{{y1+15+($index*(y2/countrylist.length))}}'/>\
                                <text sg-x='{{x1-40}}' sg-y='{{y1+48+($index*(y2/countrylist.length))}}'>{{country.name}}</text>\
                            </g>\
                            <line sg-x1='{{x1}}' sg-x2='{{x1-10}}' sg-y1='{{y1+5+($index*(y2/countrylist.length))}}' sg-y2='{{y1+5+($index*(y2/countrylist.length))}}'></line>\
                            <rect class='grid rect' sg-x='{{x1}}' rx='0' ry='0' sg-y='{{y1+15+($index*(y2/countrylist.length))}}' sg-width='{{getBarWidth(country[\"population\"])}}' height='30' style='fill:{{colors[$index]}} '></rect>\
                        </g>\
                    </g>\
                    <g class='grid y-grid' id='yGrid'>\
                        <line sg-x1='{{x1}}' sg-x2='{{x2}}' sg-y1='{{y2}}' sg-y2='{{y2}}'></line>\
                        <g ng-repeat='item in xAxis'>\
                            <line sg-x1='{{x1 + ($index * ((x2)/xAxis.length))}}' sg-x2='{{x1 + ($index * ((x2)/xAxis.length))}}' sg-y1='{{y2}}' sg-y2='{{y2+5}}'></line>\
                            <line class='grid dottedline'  sg-x1='{{x1 + ($index * ((x2)/xAxis.length))}}' sg-x2='{{x1 + ($index * ((x2)/xAxis.length))}}' sg-y1='5' sg-y2='{{y2}}'></line>\
                            <text sg-x='{{x1 + ($index * ((x2)/xAxis.length))-5}}' sg-y='{{y2+20}}'>{{item}}</text>\
                        </g>\
                    </g>\
                </svg>\
            </div>\
        </div>\
     </div>\
    ";
    $templateCache.put('chart/bar', template);

}]);