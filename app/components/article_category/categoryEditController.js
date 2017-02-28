(function (app) {
    app.controller('categoryEditController', categoryEditController);

    categoryEditController.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];

    function categoryEditController($scope, apiService, notificationService, $state, $stateParams) {
             $scope.category = {};
             $scope.editCategory = editCategory;

             function editCategory() {
                var config = {
                    _id : $scope.category._id,
                    name : $scope.category.name,
                    description : $scope.category.description
                }

                apiService.put('/category/update', config, function(result) {

                    if(result.data.data) {
                        notificationService.displaySuccess('Cập nhật thành công');
                    } else {
                        notificationService.displaySuccess('Cập nhật thất bại');
                    }
                    $state.go('categories');
                }, function(err) {

                });
             }

             function getById() {
                 apiService.get(`/category/getbyid?_id=${$stateParams.id}`, null, function(result) {
                      $scope.category = result.data;
                 }, function(err){

                 });
             }

             getById();
    }

})(angular.module('admin.category'));