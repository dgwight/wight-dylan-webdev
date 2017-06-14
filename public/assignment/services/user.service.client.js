/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", function ($http, CommonService) {

            const UserService = CommonService("user");
            UserService.findByUsername = findByUsername;
            UserService.findByCredentials = findByCredentials;
            UserService.login = login;
            UserService.logout = logout;
            UserService.register = register;

            return UserService;

            function findByUsername(username) {
                return UserService.findByParams({"username": username});
            }

            function findByCredentials(username, password) {
                return UserService.findByParams({"username": username, "password": password});
            }

            function login(user) {
                console.log("login user: ", user.username, user.password);
                return $http.post("/api/login", user);
            }

            function logout(user) {
                return $http.post("/api/logout");
            }

            function register(user) {
                return $http.post("/api/register", user);
            }
        });
})();
