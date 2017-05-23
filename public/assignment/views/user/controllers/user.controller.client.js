/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($scope) {
        var vm = this;

    }

    function RegisterController($scope) {
        var vm = this;

    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();
    }

})();
