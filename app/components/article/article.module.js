(function () {
    angular.module('admin.article', ['blog.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('articles', {
            url : '/articles' ,
            templateUrl : '/app/components/article/articleListView.html',
            controller : 'articleListController'
        })

        .state('article-add', {
            url : '/article-add',
            templateUrl : '/app/components/article/articleAddView.html',
            controller : 'articleAddController'
        })
        
        .state('article-edit', {
            url : '/article-edit/:id',
            templateUrl : '/app/components/article/articleEditView.html',
            controller : 'articleEditController'
        });
    }


})();