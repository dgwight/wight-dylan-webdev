/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService
                .login(user)
                .then(function (response) {
                    const user = response.data;
                    console.log(user);
                    $rootScope.currentUser = user;
                    $location.url('/user/' + user._id);
                }).catch(function (error) {
                    vm.alert = "Username " + user.username + " not found, please try again";
                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user, passwordConfirm) {
            if (user.password !== passwordConfirm) {
                vm.alert = "Passwords do not match";
                return;
            }

            UserService
                .create(user)
                .then(function (user) {
                    $location.url('/user/' + user._id);
                }).catch(function (error) {
                    vm.alert = "Could not create user, please try again";
                });
        }
    }

    function ProfileController($routeParams, $location, $rootScope, UserService) {
        var vm = this;
        vm.update = update;
        vm.logout = logout;

        vm.uid = $routeParams["uid"];
        function init() {
            UserService
                .findById(vm.uid)
                .then(function (user) {
                    vm.user = JSON.parse(JSON.stringify(user));
                }).catch(function (error) {
                    vm.alert = "User not found, please try again";
                });
        }

        init();

        function update(user) {
            UserService
                .update(user._id, user)
                .then(function (user) {
                    vm.alert = "Updated";
                }).catch(function (error) {
                    vm.alert = "User not found, please try again";
                });
        }

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    })
        }
    }
})();