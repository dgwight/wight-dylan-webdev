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
            console.log(user);
            if (!user || !user.username) {
                vm.alert = "Username is required";
                return;
            } else if (!user.password) {
                vm.alert = "Password is required";
                return;
            }

            UserService
                .login(user)
                .then(function (response) {
                    const user = response.data;
                    $rootScope.currentUser = user;
                    $location.url('/user/' + user._id);
                }).catch(function (error) {
                    vm.alert = "Username " + user.username + " not found, please try again";
                });
        }
    }

    function RegisterController($location, $rootScope, UserService) {
        var vm = this;
        vm.register = register;

        function register(user, passwordConfirm) {
            if (!user || !user.username) {
                vm.alert = "Username required";
                return;
            } else if (!user.password) {
                vm.alert = "Password required";
                return;
            } else if (user.password !== passwordConfirm) {
                vm.alert = "Passwords do not match";
                return;
            }

            UserService
                .register(user)
                .then(function(response) {
                        const user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id);
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
            if (!user || !user.username) {
                vm.alert = "Username required";
                vm.message = null;
                return;
            }

            UserService
                .update(user._id, user)
                .then(function (user) {
                    vm.alert = null;
                    vm.message = "Updated user";
                }).catch(function (error) {
                    vm.alert = "User not found, please try again";
                    vm.message = null;
            });
        }

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/");
                });
        }
    }
})();