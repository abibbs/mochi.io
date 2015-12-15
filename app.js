'use strict';
// http://dev.markitondemand.com/MODApis/
angular.module('mochiApp',[])

// .config(['$httpProvider', function($httpProvider) {
//   $httpProvider.defaults.useXDomain = true;
//   $httpProvider.defaults.withCredentials = true;
//   delete $httpProvider.defaults.headers.common["X-Requested-With"];
//   $httpProvider.defaults.headers.common["Accept"] = "application/json";
//   $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
//   }
// ])

.controller('tickerUpdate',function($scope,$http) {
  // $scope.lookup;
  // $scope.search = undefined;

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
});