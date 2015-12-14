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

.controller('stockLookup',function($scope,$http) {
  // $scope.lookup;
  // $scope.search = undefined;

  // $http.jsonp('http://dev.markitondemand.com/Api/v2/Lookup/jsonp?jsoncallback=JSON_CALLBACK&input="facebook"')
  // .success(function(res) {
  //   $scope.lookup = res[0];
  //   console.dir($scope.lookup);
  //   // console.log($scope.mochi);
  // })

  $scope.getLookup = function() {
    if ($scope.search === undefined){
    $scope.search = "facebook";
    }

    $http.jsonp('http://dev.markitondemand.com/Api/v2/Lookup/jsonp?jsoncallback=JSON_CALLBACK&input="'+$scope.search+'"')
      .success(function(res) {
      $scope.lookup = res[0];
      console.dir($scope.lookup);
      // console.log($scope.mochi);
    })
    // console.log($scope.search)
  }
})

.controller('stockQuote',function($scope,$http) {

});