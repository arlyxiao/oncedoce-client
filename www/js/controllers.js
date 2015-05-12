angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope) {})

.controller('AccountCtrl', function($scope, $state, $window) {
  if ($window.sessionStorage.username) {
    $scope.username = $window.sessionStorage.username
    return;
  }
  $state.go('tab.login');
})

// .controller('LoginCtrl', function($scope, RegisterUser) {
  
//   $scope.postData = {};
//   $scope.newPost = function() {
//     var post = new RegisterUser($scope.postData);
//     post.$save();
//   }
// })


// .controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
//     $scope.data = {};

//     $scope.login = function() {
//         LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
//             $state.go('tab.login');
//         }).error(function(data) {
//             var alertPopup = $ionicPopup.alert({
//                 title: 'Login failed!',
//                 template: 'Please check your credentials!'
//             });
//         });
//     }
// })


.controller('LoginCtrl', function($scope, $state, $http, $window) {
  
  $scope.user = {username: 'john.doe', password: 'foobar'};
  $scope.message = '';
  $scope.submit = function () {
    $http
      .post(api_domain + '/api/users/login', $scope.user)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $window.sessionStorage.username = JSON.parse(data.user).username;  
        $state.go('tab.account');    
      })
      .error(function (data, status, headers, config) {
        delete $window.sessionStorage.token;
      });
  };

})



.controller('TopicsCtrl', function($scope, $http, $stateParams) {
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
