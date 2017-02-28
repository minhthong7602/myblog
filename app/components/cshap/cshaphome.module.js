(function (){
      angular.module('home.cshap', ['blog.common']).config(config);

      config.$inject = ['$stateProvider', '$urlRouterProvider'];

      function config($stateProvider, $urlRouterProvider) {
          $stateProvider.state('cshaphome', {
              url :'/cshap/:id',
              templateUrl : 'app/components/cshap/cshapHomeView.html',
              controller : 'cshapHomeController'
          });
      }
})();