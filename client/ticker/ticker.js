angular.module('mochi.ticker',[])
.controller('tickerUpdate',function($scope,$http) {
  // $scope.lookup;
  // $scope.search = undefined;

  // $http.jsonp('http://dev.markitondemand.com/Api/v2/Lookup/jsonp?jsoncallback=JSON_CALLBACK&input="facebook"')
  // .success(function(res) {
  //   $scope.lookup = res[0];
  //   console.dir($scope.lookup);
  //   // console.log($scope.mochi);
  // })
  var kirbyFn = function() {
    var kirby = ["Q('-'Q)","O-('-'Q)"];
    for (var i = 0; i < 2; i++) {
      console.log(kirby[i])
    }
    return;
  }

  $scope.getLookup = function() {
    if ($scope.searchLook === undefined) {
      $scope.searchLook = "facebook";
    }

    $http.jsonp('http://dev.markitondemand.com/Api/v2/Lookup/jsonp?jsoncallback=JSON_CALLBACK&input="'+$scope.searchLook+'"')
      .success(function(res) {
      $scope.lookup = res[0];
      console.dir($scope.lookup);
      // console.log($scope.mochi);
    })
    // clear the form
    $scope.searchLook = '';
  }

  $scope.getQuote = function() {
     if ($scope.searchQuote === undefined) {
      $scope.searchQuote = "fb";
    }
    var temp = $scope.searchQuote;

    $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?jsoncallback=JSON_CALLBACK&symbol='+$scope.searchQuote)
      .success(function(res) {
      $scope.quote = res;
      console.dir($scope.quote);
    })

    if ($scope.searchQuote) {
      setInterval(function() {
        $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?jsoncallback=JSON_CALLBACK&symbol='+temp)
        .success(function(res) {
          $scope.quote = res;
          console.dir($scope.quote);
          console.log(kirbyFn());
        });
      },6000)
    }
    // clear the form
    $scope.searchQuote = '';
  }
});