angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ArticlesCtrl', function($scope, $http, $stateParams, Articles) {
  var start = 1;
  $scope.articles = Articles.query({page: start});

  $scope.loadMore = function() {
    
    $http.get(api_domain + '/api/fetch_articles?page=' + start).success(function(items) {
      $scope.articles = $scope.articles.concat(items);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });

    start += 1
  };

  // $scope.$on('$stateChangeSuccess', function() {
  //   $scope.loadMore();
  // });


})

.controller('ArticlesShowCtrl', function($scope, $stateParams, Article) {
  $scope.article = Article.get({id: $stateParams.id});
});
