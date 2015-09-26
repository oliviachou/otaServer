'use strict';

/**
 * @ngdoc function
 * @name otaClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the otaClientApp
 */
angular.module('otaClientApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //initial defaults
    $scope.searchTerm = "europe debate";
    $scope.articleDescriptions = [];

    $scope.searchJuicer = searchJuicer;

    searchJuicer();

    function searchJuicer() {
      var encodedSearchTerm = encodeURIComponent($scope.searchTerm);

      $http.get('/mainArticleSearch/' + encodedSearchTerm)
        .success(function (data, status, headers, config) {
          var max = 5;
          var current = 0;

          //var listDiv = document.getElementById("topFive");
          //listDiv.innerHTML = "";

          $scope.articleDescriptions = [];

          data.forEach(function (val) {
            console.log(val);

            if (current < max) {
              if (val.body) {
                $scope.articleDescriptions.push(val.description);
                current++;
              }
              else {
                console.log("article has no body");
              }
            }
          });

          $scope.title = data[0].title;
          $scope.body = data[0].body;

        }).error(function(data, status, headers, config) {
      });
    };
  }]);
