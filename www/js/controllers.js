angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope) {})

.controller('LoginCtrl', function() {})

.controller('TopicsCtrl', function($scope, $http, $stateParams, Topics) {
  var start = 1;
  $scope.topics = Topics.query({page: start});

  $scope.loadMore = function() {
    
    if (start > 1) {
      $http.get(api_domain + '/api/fetch_topics?page=' + start).success(function(items) {
        $scope.topics = $scope.topics.concat(items);
      });

      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    start += 1
  };

})

.controller('TopicsShowCtrl', function($scope, $stateParams, Topic) {
  $scope.topic = Topic.get({id: $stateParams.id});
})

.controller('ArticlesCtrl', function($scope, $http, $stateParams, Articles) {
  var start = 1;
  $scope.articles = Articles.query({page: start});

  $scope.loadMore = function() {

    $http.get(api_domain + '/api/fetch_articles?page=' + start).success(function(items) {
      $scope.articles = $scope.articles.concat(items);
    });

    $scope.$broadcast('scroll.infiniteScrollComplete');

    start += 1
  };

  // $scope.$on('$stateChangeSuccess', function() {
  //   $scope.loadMore();
  // });


})

.controller('ArticlesShowCtrl', function($scope, $stateParams, Article) {
  $scope.article = Article.get({id: $stateParams.id});
});
