(function (app) {
    app.controller('articleAddController', articleAddController);

    articleAddController.$inject = ['$scope', 'apiService', 'notificationService', '$state', 'commonService'];

    function articleAddController($scope, apiService, notificationService, $state, commonService) {
        $scope.article = {};
        $scope.addArticle = addArticle;
        $scope.categories = [];
        $scope.changeSeo = changeSeo;

        function changeSeo() {
            $scope.article.article_seo = commonService.getSeoTitle($scope.article.name);
        }

        function addArticle() {
            var config = {
                name: $scope.article.name,
                article_seo: $scope.article.article_seo,
                title: $scope.article.title,
                description: $scope.article.description,
                content: $scope.article.content,
                category: $scope.article.category,
                status: $scope.article.status,
                home_article :  $scope.article.home_article
            }
            apiService.post('/article/create', config, function (result) {
                if (result.data.data) {
                    notificationService.displaySuccess("Thêm mới thành công");
                    $state.go('articles');
                } else {
                    notificationService.displayError("Thêm mới thất bại");
                }
            }, function (err) {

            });
        }

        function getCategories() {

            apiService.get(`/category?keyword=`, null, function (result) {
                $scope.categories = result.data;
            }, function (err) {
                notificationService.displayError("Lấy dữ liệu thất bại");
            });
        }

        getCategories();

    }

})(angular.module('admin.article'));