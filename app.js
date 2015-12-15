// http://dev.markitondemand.com/MODApis/
var app = angular.module('mochiApp',['ngRoute'])

// .config(['$httpProvider', function($httpProvider) {
//   $httpProvider.defaults.useXDomain = true;
//   $httpProvider.defaults.withCredentials = true;
//   delete $httpProvider.defaults.headers.common["X-Requested-With"];
//   $httpProvider.defaults.headers.common["Accept"] = "application/json";
//   $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
//   }
// ])

.controller('tickerUpdate',function($scope,$http) {
  // $http.jsonp('http://dev.markitondemand.com/Api/v2/Lookup/jsonp?jsoncallback=JSON_CALLBACK&input="facebook"')
  // .success(function(res) {
  //   $scope.lookup = res[0];
  //   console.dir($scope.lookup);
  //   // console.log($scope.mochi);
  // })

  $scope.getLookup = function() {
    if ($scope.searchLook === undefined){
    $scope.searchLook = "facebook";
    }

    $http.jsonp('http://dev.markitondemand.com/Api/v2/Lookup/jsonp?jsoncallback=JSON_CALLBACK&input="'+$scope.searchLook+'"')
      .success(function(res) {
      $scope.lookup = res[0];
      console.dir($scope.lookup);
      // console.log($scope.mochi);
    })
  }

  $scope.getQuote = function() {
     if ($scope.searchQuote === undefined){
    $scope.searchQuote = "fb";
    }

    $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?jsoncallback=JSON_CALLBACK&symbol='+$scope.searchQuote)
      .success(function(res) {
      $scope.quote = res;
      console.dir($scope.quote);
    })
  }
})

.config(function($routeProvider) {
  // $locationProvider.html5Mode(true);

  $routeProvider
  .when('/', {
    templateUrl: 'index.html',
    controller: 'tickerUpdate'
  })
  .when('/trades', {
    templateUrl: 'trades.html'
  })
});