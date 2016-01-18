angular.module('mochi.tracker',[])
.controller('trackTrades',function($scope) {
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
    $scope.profitLoss = '';
  };
});