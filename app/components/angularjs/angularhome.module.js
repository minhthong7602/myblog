(function () {
    angular.module('home.angular', ['blog.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('angularjshome', {
            url: '/angularjs/:id',
            templateUrl : 'app/components/angularjs/angularHomeView.html',
            controller : 'angularHomeController'
        });
    }
})();