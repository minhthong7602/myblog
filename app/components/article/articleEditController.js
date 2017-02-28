(function (app) {
    app.controller('articleEditController', articleEditController);

    articleEditController.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams', 'commonService'];

    function articleEditController($scope, apiService, notificationService, $state, $stateParams, commonService) {
        $scope.article = {};
        $scope.editArticle = editArticle;
        $scope.categories = [];
        $scope.changeSeo = changeSeo;

        function getCategories() {

            apiService.get(`/category?keyword=`, null, function (result) {
                $scope.categories = result.data;
            }, function (err) {
                notificationService.displayError("Lấy dữ liệu thất bại");
            });
        }
        function changeSeo() {
            $scope.article.article_seo = commonService.getSeoTitle($scope.article.name);
        }

        function editArticle() {
            var config = {
                _id : $scope.article._id,
                name: $scope.article.name,
                article_seo: $scope.article.article_seo,
                title: $scope.article.title,
                description: $scope.article.description,
                content: $scope.article.content,
                category: $scope.article.category,
                status: $scope.article.status,
                home_article :  $scope.article.home_article
            }
            apiService.put('/article/update', config, function (result) {
                if (result.data.data) {
                    notificationService.displaySuccess("Cập nhật thành công");
                    $state.go('articles');
                } else {
                    notificationService.displayError("Cập nhật thất bại");
                }
            }, function (err) {

            });
        }

        function getArticle() {
            apiService.get(`/article/getbyid?id=${$stateParams.id}`, null, function (result) {
                $scope.article = result.data;
            }, function (err) {

            });
        }

        getArticle();
        getCategories();
    }

})(angular.module('admin.article'));