angular.module('JWTDemoApp')
    .controller('LoginController', function ($http, $scope, $state, AuthService, $rootScope) {
        $scope.login = function () {
            $http({
                url: '/login',
                method: "POST",
                data: JSON.stringify({
                    email: $scope.email,
                    password: $scope.password,
                })
            }) .then(function successCallback(res) {
                $scope.password = null;
                if (res.data.token) {
                    $scope.message = '';
                    $http.defaults.headers.common['Authorization'] = res.data.token;
                    var token = res.data.token;
                    $scope.getUser(res.data.user_id, token);

                } else {
                    $scope.message = 'Authetication Failed !';
                }
            }, function errorCallback(error) {
                $scope.message = 'Authetication Failed !';
            });
        };
        $scope.getUser = function (id, token) {
            $http({
                url: '/users/'+id,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : token
                }
            }) .then(function successCallback(res) {
                var user = {
                    id:id,
                    email:res.data.email,
                    firstName:res.data.firstName,
                    lastName:res.data.lastName,
                    role:res.data.role,
                    status:res.data.status,
                    token:token
                }
                AuthService.user = user;
                    $state.name = 'logined'
                $rootScope.$broadcast('LoginSuccessful');
                $state.go('home');
            }, function errorCallback(error) {
                $scope.message = 'Authetication Failed !';
            });
        };
    });
