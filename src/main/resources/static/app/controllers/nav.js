angular.module('JWTDemoApp')
// Creating the Angular Controller
    .controller('NavController', function ($http, $scope, AuthService, $state, $rootScope) {
        $scope.$on('LoginSuccessful', function () {
            $scope.user = AuthService.user;
        });
        $scope.$on('LogoutSuccessful', function () {
            $scope.user = null;
        });
        $scope.logout = function () {
            $http({
                url: "/logout",
                method: "POST",
                headers: {
                    'Authorization': AuthService.user.token
                }
            }).then(function success(res) {
            }, function error(error) {
            });
            AuthService.user = null;
            $rootScope.$broadcast('LogoutSuccessful');
            $state.go('login');
        };
    });
