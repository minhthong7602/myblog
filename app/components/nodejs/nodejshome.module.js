(function (){
  angular.module('home.nodejs', ['blog.common']).config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
     $stateProvider
        .state('nodejshome', {
            url: '/nodejs/:id',
            templateUrl: 'app/components/nodejs/nodejsHomeView.html',
            controller : 'nodejsHomeController'
        });
  }

})();