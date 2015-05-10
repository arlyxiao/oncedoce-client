angular.module('starter.services', ['ngResource'])



.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})


.factory('Topics', function($resource) {
  return $resource(api_domain + '/api/fetch_topics?page=:page');
})


.factory('Topic', ['$resource', function($resource) {
  return $resource(api_domain + '/api/fetch_topics/:id');
}])

.factory('Articles', function($resource) {
  return $resource(api_domain + '/api/fetch_articles?page=:page');
})


.factory('Article', ['$resource', function($resource) {
  return $resource(api_domain + '/api/fetch_articles/:id');
}]);



// .factory('Articles', function($scope, FetchArticles) {


//   var articles = [{
//     id: 1,
//     title: 'test title1',
//     content: 'test content1'
//   },
//   {
//     id: 2,
//     title: 'test title2',
//     content: 'test content2'
//   }];

//   return {
//     all: function() {
//       return articles;
//     },

//     get: function(articleId) {
//       for (var i = 0; i < articles.length; i++) {
//         if (articles[i].id === parseInt(articleId)) {
//           return articles[i];
//         }
//       }
//       return null;
//     }
//   };
// });
