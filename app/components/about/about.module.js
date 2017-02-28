(function () {
    angular.module('home.about', ['blog.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('about', {
            url : '/about/:id',
            templateUrl : '/app/components/about/aboutView.html',
            controller : 'aboutController' 
        });
    }
})();