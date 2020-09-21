angular.module('JWTDemoApp')
// Creating the Angular Controller
    .controller('RegisterController', function ($http, $scope, AuthService) {
        $scope.submit = function () {
            $http.post('register', $scope.appUser)
                .then(function (res) {
                $scope.appUser = null;
                $scope.confirmPassword = null;
                $scope.register.$setPristine();
                $scope.message = "Registration successfull !";
            }).then(function (res) {
                $state.go('login');
            } , function (error) {
                $scope.message = "Registration error, perhaps this email is already registered!";
            });
        };
    });
