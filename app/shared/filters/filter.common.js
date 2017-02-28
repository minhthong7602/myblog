(function (app) {
    app.filter('formatStatus', function () {
        return function (input) {
            if (input)
                return 'Hiện thị';
            else
                return 'Không hiện thị';
        }

    })
})(angular.module('blog.common'));