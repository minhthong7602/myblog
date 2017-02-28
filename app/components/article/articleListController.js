(function (app) {
    app.controller('articleListController', articleListController);

    articleListController.$inject = ['$scope', 'apiService', 'notificationService', '$state'];

    function articleListController($scope, apiService, notificationService, $state) {
        $scope.articles = [];
        $scope.keyword = '';
        $scope.page = 1;
        $scope.totalCount = 0;
        $scope.getArticles = getArticles;
        $scope.categories = [];
        $scope.category = '';
        $scope.pageCount = 0;
        function getArticles(page) {
           
            page = page - 1;
            if (page >= 0) {
                var url = `/article?keyword=${$scope.keyword}&category=${$scope.category}&page=${page}&pageSize=10`;
                apiService.get(url, null, function (result) {             
                    $scope.articles = result.data.Items;
                    $scope.totalCount = result.data.totalCount;
                    if(($scope.totalCount % 10) != 0) {
                        $scope.pageCount = parseInt($scope.totalCount/10) + 1;
                    }
                }, function (err) {
                });
            }

        }

        function getCategories() {

            apiService.get(`/category?keyword=`, null, function (result) {
                $scope.categories = result.data;
                var category = {_id : '', name : 'Chọn danh mục bài viết'};
                $scope.categories.unshift(category);
            }, function (err) {
                notificationService.displayError("Lấy dữ liệu thất bại");
            });
        }
        getCategories();
        getArticles(1);
    }

})(angular.module('admin.article'));