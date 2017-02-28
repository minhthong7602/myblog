(function (app) {
         app.controller('categoryAddController', categoryAddController);

         categoryAddController.$inject = ['$scope', 'apiService', 'notificationService', '$state', 'commonService'];

         function categoryAddController($scope, apiService, notificationService, $state, commonService) {
                $scope.category = {};
                $scope.addCategory = addCategory;
               

                function addCategory() {
                    var config = {                      
                            name : $scope.category.name,
                            description : $scope.category.description  
                    }
                    apiService.post('/category/create', config, function(result){
                        //    var respone = JSON.parse(result.data);
                        
                            if(result.data.data) {
                                notificationService.displaySuccess("Thêm mới thành công");
                                $state.go('categories');
                            } else {
                                notificationService.displayError("Thêm mới thất bại");
                            }
                    }, function(err) {
                        notificationService.displayError("Thêm mới thất bại");
                    }); 
                }

         }

})(angular.module('admin.category'));