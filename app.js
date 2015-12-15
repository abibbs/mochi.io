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
        });
      },6000)
    }
    // clear the form
    $scope.searchQuote = '';
  }
});

app.controller('trackTrades',function($scope) {
  $scope.trade = {};
  $scope.data = [];

  $scope.getTrade = function() {
    // Save temp copy of company name for UI show
    $scope.tempName = $scope.companyName;

    $scope.trade.date = $scope.date;
    // Buy price
    if ($scope.buyPrice) {
      $scope.trade.buyPrice = $scope.buyPrice;
    }
    // Sale price
    if ($scope.salePrice) {
      $scope.trade.salePrice = $scope.salePrice;
    }
    $scope.trade.tickerSymbol = $scope.tickerSymbol;
    $scope.trade.sharesAmt = $scope.tradeShares;
    $scope.trade.companyName = $scope.companyName;
    // Profit amount
    if (!isNaN($scope.buyPrice) && !isNaN($scope.salePrice) && $scope.profitLoss) {
      $scope.trade.profitLoss = $scope.tradeShares * $scope.profitLoss;
    }
    // Push data into array
    $scope.data.push($scope.trade);
    console.log($scope.data);
  }

  $scope.remove = function(item) { 
    var index = $scope.data.indexOf(item);
    $scope.data.splice(index, 1);     
  };

  $scope.clearForm = function() {
    $scope.date = '';
    $scope.buyPrice = '';
    $scope.salePrice = '';
    $scope.tickerSymbol = '';
    $scope.tradeShares = '';
    $scope.companyName = '';
  };
});