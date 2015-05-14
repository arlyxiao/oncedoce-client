angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope) {})

.controller('AccountCtrl', function($scope, $state, $window, loginService) {

  $scope.$on('$ionicView.enter', function(){
    if (loginService.undone()) {
      $state.go('tab.login', {}, {reload: true});
    }
  });


  $scope.logout = function() {
    $window.localStorage.clear();
    $state.go('tab.login', {}, {reload: true});
  }

  $scope.$on('$stateChangeSuccess', function() {
    $scope.username = $window.localStorage.username;
  });
  
})



.controller('LoginCtrl', function($scope, $state, $http, $window) {
  
  $scope.user = {'email': 'test@linux.com', 'password': '111111'};
  
  $scope.submit = function () {
    $http
      .post(api_domain + '/api/users/login', $scope.user)
      .success(function (data, status, headers, config) {
        var user = JSON.parse(data.user);
        $window.localStorage.token = user.auth_token;
        $window.localStorage.username = user.username;
        $state.go('tab.account', {}, {reload: true}); 
      })
      .error(function (data, status, headers, config) {
        $scope.message = 'Please make sure your email and password are correct'
        delete $window.localStorage.token;
        delete $window.localStorage.username;
      });
  };

})



.controller('TopicsCtrl', function($scope, $state, $http, loginService) {

  $scope.$on('$ionicView.enter', function(){
    if (loginService.undone()) {
      $state.go('tab.login', {}, {reload: true});
    }
  });
  

  var start = 1;
  $scope.topics = [];

  $scope.moreDataCanBeLoaded = function() {
    return true;
  }

  $scope.loadMoreTopics = function() {
    
    $http.get(api_domain + '/api/topics?page=' + start).success(function(items) {
      if (items.length == 0) {
        $scope.moreDataCanBeLoaded = function() {
          return false;
        }
      }
      $scope.topics = $scope.topics.concat(items);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });

    start += 1;
  };


})

.controller('TopicsShowCtrl', function($scope, $stateParams, Topic) {
  $scope.topic = Topic.get({id: $stateParams.id});
})

.controller('ArticlesCtrl', function($scope, $http, $stateParams) {
  var start = 1;
  $scope.articles = [];

  $scope.moreDataCanBeLoaded = function() {
    return true;
  }

  $scope.loadMoreArticles = function() {
    $http.get(api_domain + '/api/articles?page=' + start).success(function(items) {
      if (items.length == 0) {
        $scope.moreDataCanBeLoaded = function() {
          return false;
        }
      }
      $scope.articles = $scope.articles.concat(items);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });

    start += 1;
  };


})

.controller('ArticlesShowCtrl', function($scope, $stateParams, Article) {
  $scope.article = Article.get({id: $stateParams.id});
});
