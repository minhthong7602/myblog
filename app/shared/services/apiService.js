(function (app) {

    app.service('apiService', apiService);
    apiService.$inject = ['$http', 'notificationService'];

    function apiService($http, notificationService) {

        return {
            get: get,
            post: post,
            put: put,
            del:del

        }
        //Http Delete
        function del(url, data, success, failure) {
            $http.delete(url, data).then(function (result) {
                success(result);
            }, function(err) {
                failure(err);
            });
        }
        //Http Post
        function post(url, data, success, failure) {
            $http.post(url, data).then(function (result) {
                success(result);
            }, function(err) {
                failure(err);
            });
        }
        //Http Put
        function put(url, data, success, failure) {
            $http.put(url, data).then(function (result) {
                success(result);
            }, function(err) {
                failure(err);
            });
        }
        //Http Get
         function get(url, data, success, failure) {
            $http.get(url, data).then(function (result) {
                success(result);
            }, function(err) {
                failure(err);
            });
        }

}
})(angular.module('blog.common'));