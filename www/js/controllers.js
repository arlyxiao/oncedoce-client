angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope) {})

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


.controller('LoginCtrl', function($scope, $http, $window) {
  
  $scope.user = {username: 'john.doe', password: 'foobar'};
  $scope.message = '';
  $scope.submit = function () {
    $http
      .post(api_domain + '/api/users/login', $scope.user)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $scope.message = 'Welcome';
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        alert('error')
        delete $window.sessionStorage.token;

        // Handle login errors here
        $scope.message = 'Error: Invalid user or password';
      });
  };

})



.controller('TopicsCtrl', function($scope, $http, $stateParams, Topics) {
  var start = 1;
  $scope.topics = Topics.query({page: start});

  $scope.loadMore = function() {
    
    if (start > 1) {
      $http.get(api_domain + '/api/topics?page=' + start).success(function(items) {
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

    $http.get(api_domain + '/api/topics?page=' + start).success(function(items) {
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
