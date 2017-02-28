(function () {

    angular.module('admin', ['blog.common', 'admin.category', 'admin.image', 'angularUtils.directives.dirPagination', 'admin.article']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url : '/home',
            templateUrl : '/app/components/admin/adminHomeView.html',
            controller : 'adminController'
        });

        $urlRouterProvider.otherwise('/home');
    }

})();