angular.module('starter.services', ['ngResource'])


.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.localStorage.token) {
        config.headers.Authorization = $window.localStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
})

.factory('loginService', function($window) {
  return {
    undone: function() {
      if ($window.localStorage.username == undefined || $window.localStorage.username == '') {
        return true;
      }
      return false;
    }
  };
})


.factory('RegisterUser', function($resource) {
  return $resource(api_domain + '/api/register_user');
})


.factory('Topics', function($resource) {
  return $resource(api_domain + '/api/topics?page=:page');
})


.factory('Topic', ['$resource', function($resource) {
  return $resource(api_domain + '/api/topics/:id');
}])

.factory('Articles', function($resource) {
  return $resource(api_domain + '/api/articles?page=:page');
})


.factory('Article', ['$resource', function($resource) {
  return $resource(api_domain + '/api/articles/:id');
}]);



