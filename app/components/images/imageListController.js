(function (app) {
    app.controller('imageListController', imageListController);

    imageListController.$inject = ['$scope', 'apiService', 'notificationService', '$state'];

    function imageListController($scope, apiService, notificationService, $state) {

        $scope.images = [];
        $scope.images_store = [];
        $scope.keyword = '';
        $scope.getImages = getImages;
        $scope.downloadImage = downloadImage;
        $scope.TotalCount = 0;
        $scope.page = 1;
        $scope.minPage = 1;
        $scope.pagesCount = 0;
        $scope.uploadFile = uploadFile;
        $scope.search = search;
        $scope.pageList = [];

        function search() {
            let images = [];
            let keyword = $scope.keyword;
            $scope.images_store.forEach(function (item, index) {
                if (item.name.includes(keyword)) {
                    images.push(item);
                }
            });
            $scope.images = images;
            console.log($scope.images);
        }

        function uploadFile() {
            var url = '/file/upfile';
            window.open(url, '_blank');
        }
        function downloadImage(img) {
            var url = '/image/download/' + img;
            window.open(url, '_blank');

        }

        function getImagesFromServer() {
            apiService.get('/image/', null, function (result) {
                $scope.images_store = result.data;
                $scope.TotalCount = $scope.images_store.length;
                $scope.pagesCount = parseInt($scope.TotalCount / 10);
                if ($scope.pagesCount * 10 < $scope.images_store.length) {
                    $scope.pagesCount += 1;
                }
                for (let i = 1; i <= $scope.pagesCount; i++) {
                    $scope.pageList.push(i);
                }
                getImages(1);
            }, function (err) { });
        }

        function getImages(p) {
            if (p > 0 && p <= $scope.pagesCount) {

                p = p - 1;
                let limit = p * 10 + 10;
                if (p + 1 == $scope.pagesCount) {
                    limit = $scope.TotalCount;
                }


                let images = [];
                for (let i = p * 10; i < limit; i++) {
                    images.push($scope.images_store[i]);
                }

                $scope.images = images;

            }


        }

        getImagesFromServer();
    }

})(angular.module('admin.image'));