// http://dev.markitondemand.com/MODApis/
var app = angular.module('mochiApp',[]);

// .config(['$httpProvider', function($httpProvider) {
//   $httpProvider.defaults.useXDomain = true;
//   $httpProvider.defaults.withCredentials = true;
//   delete $httpProvider.defaults.headers.common["X-Requested-With"];
//   $httpProvider.defaults.headers.common["Accept"] = "application/json";
//   $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
//   }
// ])

app.controller('tickerUpdate',function($scope,$http) {
  // $scope.lookup;
  // $scope.search = undefined;

  // $http.jsonp('http://dev.markitondemand.com/Api/v2/Lookup/jsonp?jsoncallback=JSON_CALLBACK&input="facebook"')
  // .success(function(res) {
  //   $scope.lookup = res[0];
  //   console.dir($scope.lookup);
  //   // console.log($scope.mochi);
  // })

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
  }

  $scope.getQuote = function() {
     if ($scope.searchQuote === undefined) {
      $scope.searchQuote = "fb";
    }

    $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?jsoncallback=JSON_CALLBACK&symbol='+$scope.searchQuote)
      .success(function(res) {
      $scope.quote = res;
      console.dir($scope.quote);
    })

    if ($scope.searchQuote) {
      setInterval(function() {
        $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?jsoncallback=JSON_CALLBACK&symbol='+$scope.searchQuote)
        .success(function(res) {
          $scope.quote = res;
          console.dir($scope.quote);
        });
      },6000)
    }
  }
});

app.controller('trackTrades',function($scope) {
  $scope.trade = {};
  $scope.data = [];

  $scope.getTrade = function() {
    $scope.trade.date = $scope.date;
    $scope.trade.buyPrice = $scope.buyPrice;
    $scope.trade.salePrice = $scope.salePrice;
    $scope.trade.tickerSymbol = $scope.tickerSymbol;
    $scope.trade.companyName = $scope.companyName;
    $scope.trade.profitLoss = $scope.profitLoss;
    // $scope.trade.push($scope.date)
    // console.log($scope.trade.date);
  }
});