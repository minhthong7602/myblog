(function (app) {
    app.controller('adminController', adminController);

    adminController.$inject = ['$scope', 'apiService', 'notificationService', '$state'];

    function adminController($scope, apiService, notificationService, $state) {
        
    }

})(angular.module('admin'));