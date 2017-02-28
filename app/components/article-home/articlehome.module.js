(function () {
    angular.module('home.article', ['blog.common']).config(config);
    
    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('article-detail', {
            url : '/article-detail/:seo',
            templateUrl : '/app/components/article-home/articledetailView.html',
            controller : 'articledetailController'
        });
    }

})();