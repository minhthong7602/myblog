(function (app) {
    app.controller('articledetailController', articledetailController);

    articledetailController.$inject = ['$scope', '$sce', 'apiService', 'notificationService', '$stateParams', 'vcRecaptchaService'];

    function articledetailController($scope, $sce, apiService, notificationService, $stateParams, vcRecaptchaService) {
        $scope.article = {};
        //Cac bai viet cung the loai
        $scope.articles = [];
        $scope.comment = {};
        $scope.comments = [];


        $scope.toTrustedHTML = function (html) {
            return $sce.trustAsHtml(html);
        }
        function getComments(article) {
            apiService.get('/comments?article=' + article, null, function(result) {
                $scope.comments = result.data;
            }, function(err) {

            });
        }
        //Lay cac bai viet cung the loai
        function getArticles() {
            apiService.get(`/article-home/getbycategory?id=${$scope.article.category}`, null, function (result) {
                $scope.articles = result.data;
                
            }, function (err) {

            });
        }

        function getArticle() {
            apiService.get(`/article-home/getbyseo?seo=${$stateParams.seo}`, null, function (result) {
                $scope.article = result.data;
                getComments($scope.article._id);
                getArticles();
            }, function (err) {

            });
        }
        $scope.response = null;
        $scope.widgetId = null;
        $scope.model = {
            key: '6LcVDCYTAAAAAPX9khXvo-INU8maMoTJ4Ji0ZnVk'
        };
        $scope.setResponse = function (response) {
            $scope.response = response;
        };
        $scope.setWidgetId = function (widgetId) {
            $scope.widgetId = widgetId;
        };
        $scope.cbExpiration = function () {
            console.info('Captcha expired. Resetting response object');
            vcRecaptchaService.reload($scope.widgetId);
            $scope.response = null;
        };
        $scope.submit = function () {
            var valid = $scope.response == null ? false : true;
            /**
             * SERVER SIDE VALIDATION
             *
             * You need to implement your server side validation here.
             * Send the reCaptcha response to the server and use some of the server side APIs to validate it
             * See https://developers.google.com/recaptcha/docs/verify
             */
            if (valid) {
                var config = {
                       name : $scope.comment.name,
                       article : $scope.article._id,
                       email : $scope.comment.email,
                       content : $scope.comment.content
                }

                apiService.post('/comments/create', config, function(result) {
                    if(result.data.data) {
                        $scope.comment = {};
                        getComments($scope.article._id);
                        vcRecaptchaService.reload($scope.widgetId);
                    } else {
                        notificationService.displayError("Thêm bình luận thất bại");
                    }
                }, function(res) {

                });
                
            } else {
                console.log('Failed validation');
                // In case of a failed validation you need to reload the captcha
                // because each response can be checked just once
                vcRecaptchaService.reload($scope.widgetId);
            }
        };

        getArticle();

    }

})(angular.module('home.article'));