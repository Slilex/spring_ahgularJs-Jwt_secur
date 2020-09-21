angular.module('JWTDemoApp')
// Creating the Angular Controller
    .controller('UsersController', function ($http, $scope, AuthService) {
        var edit = false;
        $scope.buttonText = 'Update';
        $scope.appUser = AuthService.user;

        $scope.submit = function () {
            $http.put('/users', $scope.appUser)
                .then(function (res) {
                    $scope.message = "Editting Success";
                    AuthService.user = $scope.appUser;
                }).then(function (res) {
                $state.go('login');
            } , function (error) {
                $scope.message = error.message;
            });
        };

    });
