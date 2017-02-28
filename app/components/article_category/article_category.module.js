(function () {
     angular.module('admin.category', ['blog.common']).config(config);

     config.$inject = ['$stateProvider', '$urlRouterProvider'];

     function config($stateProvider, $urlRouterProvider) {
           $stateProvider.state('categories', {
               url : '/categories',
               templateUrl : '/app/components/article_category/categoryListView.html',
               controller : 'categoryListController'
           })
           .state('category-add', {
               url : '/category-add',
               templateUrl : '/app/components/article_category/categoryAddView.html',
               controller : 'categoryAddController'
           })

           .state('category-edit', {
               url : '/category-edit/:id',
               templateUrl : '/app/components/article_category/categoryEditView.html',
               controller : 'categoryEditController'
           });
     }

})();