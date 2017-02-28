(function (){
   angular.module('home.javascript', ['blog.common']).config(config);

   config.$inject = ['$stateProvider', '$urlRouterProvider'];

   function config($stateProvider, $urlRouterProvider) {
          $stateProvider
             .state('javascripthome', {
                 url: '/javascript/:id',
                 templateUrl :'app/components/javascript/javascriptHomeView.html',
                 controller : 'javascriptHomeController'
             });
   }

})();