(function () {
    angular.module('admin.image', ['blog.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
            $stateProvider.state('images', {
                 url : '/images',
                 templateUrl : '/app/components/images/imageListView.html',
                 controller : 'imageListController'
            });
    }

})();