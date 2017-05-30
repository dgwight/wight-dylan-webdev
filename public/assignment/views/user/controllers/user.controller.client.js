/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(login, handleError);

            function handleError(error) {
                vm.alert = "Username " + user.username + " not found, please try again" + error;
            }

            function login(found) {
                if (found !== null) {
                    $location.url('/user/' + found._id);
                } else {
                    vm.alert = "Username " + user.username + " not found, please try again";
                }
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if (user.password !== user.passwordConfirm) {
                vm.alert = "Passwords do not match";
                return;
            }

            UserService
                .createUser(user)
                .then(register, handleError);

            function handleError(error) {
                vm.alert = "Username " + user.username + " not found, please try again" + error;
            }

            function register(found) {
                if (found) {
                    $location.url('/user/' + found._id);
                } else {
                    vm.alert = "Unable to register, please try again" + error;
                }
            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.update = update;

        vm.uid = $routeParams["uid"];
        function init() {
            UserService
                .findUserById(vm.uid)
                .then(userFound, handleError);

            function handleError(error) {
                vm.alert = "User " + vm.uid + " not found, please try again" + error;
            }

            function userFound(found) {
                if (found) {
                    user = found;
                    vm.user = {
                        "_id": user._id,
                        "username": user.username,
                        "firstName": user.firstName,
                        "lastName": user.lastName,
                        "email": user.email
                    };
                } else {
                    vm.alert = "User " + vm.uid + " not found, please try again" + error;
                }
            }
        }

        init();

        function update(user) {
            UserService.updateUser(user._id, user);
        }
    }

})();
