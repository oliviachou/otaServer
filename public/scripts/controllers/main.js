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

    $scope.mainJournal = {
      title: undefined,
      body: undefined
    };

    $scope.belgiumJournal = {
      title: undefined,
      body: undefined
    };

    $scope.frenchJournal = {
      title: undefined,
      body: undefined
    };

    $scope.portugueseJournal = {
      title: undefined,
      body: undefined
    };

    //$scope.searchJuicer = searchJuicer;
    $scope.searchJuicer = populateJournals;

    populateJournals();

    function populateJournals() {
      var mainJournal = {
        sourceId: -1,
        journal: $scope.mainJournal
      };

      var belgiumJournal = {
        sourceId: 80,
        journal: $scope.belgiumJournal
      };

      var frenchJournal = {
        sourceId: 88,
        journal: $scope.frenchJournal
      };

      var portugueseJournal = {
        sourceId: 356,
        journal: $scope.portugueseJournal
      };

      var journalElements = [mainJournal, belgiumJournal, frenchJournal, portugueseJournal];

      journalElements.forEach(function (journalElems) {
        //searchJuicer();

        //function searchJuicer() {
          var encodedSearchTerm = encodeURIComponent($scope.searchTerm);

          var url = '/mainArticleSearch/' + encodedSearchTerm;

          if (journalElems.sourceId !== -1) {
            url += "/" + journalElems.sourceId;
          }

          $http.get(url)
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

              //$scope.title = data[0].title;
              journalElems.journal.title = data[0].title;
              //$scope.body = data[0].body;
              journalElems.journal.body = data[0].body;

            }).error(function(data, status, headers, config) {
            });
        //};
      });
    }
  }]);
