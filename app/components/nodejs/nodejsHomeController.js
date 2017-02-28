(function (app) {
    app.controller('nodejsHomeController', nodejsController);

    nodejsController.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams', '$sce'];
    

    function nodejsController($scope, apiService, notificationService, $state, $stateParams, $sce) {
        $scope.articles = [];
        $scope.article_home = {};
        
        $scope.toTrustedHTML = function (html) {
            return $sce.trustAsHtml(html);
        }

        function getAritles() {
            apiService.get(`/article-home/getbycategory?id=${$stateParams.id}`, null, function (result) {
                   $scope.articles = result.data;
            }, function(err) {

            });
        }

        function getHomeArticle() {
            apiService.get('/article-home/gethomearticle', null, function(result) {
                   $scope.article_home = result.data;
            }, function(err) {

            });
        }
        
        getHomeArticle();
        getAritles();
    }

})(angular.module('home.nodejs'));