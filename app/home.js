(function (){
   angular.module('home', ['blog.common', 'home.nodejs', 'home.angular', 'home.cshap', 'home.javascript', 'home.about', 'home.article', 'vcRecaptcha']).config(config);

   config.$inject = ['$stateProvider', '$urlRouterProvider'];

   function config($stateProvider, $urlRouterProvider) {
       $stateProvider
         .state('basehome', {
             url: "",
             templateUrl: 'app/shared/views/viewbasehome.html',
             abstract: true
         })
         .state('home', {
             url: "/home",
             templateUrl: "app/components/home/homeView.html",
             controller : 'homeController'
         });

         $urlRouterProvider.otherwise('home')
   }
})();