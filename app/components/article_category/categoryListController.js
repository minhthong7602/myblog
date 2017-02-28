(function (app) {
    app.controller('categoryListController', categoryListController);

    categoryListController.$inject = ['$scope', 'apiService', 'notificationService', '$state'];

    function categoryListController($scope, apiService, notificationService, $state) {
        $scope.categories = [];
        $scope.getCategories = getCategories;
        $scope.keyword = "";
        function getCategories() {
          
            apiService.get(`/category?keyword=${$scope.keyword}`, null, function(result){
                $scope.categories = result.data;
            }, function(err){
                notificationService.displayError("Lấy dữ liệu thất bại");
            });
        }
        getCategories();
    }

})(angular.module('admin.category'));