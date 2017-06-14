/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", function ($http, CommonService) {

            var api = Object.create(CommonService);
            api.setObjectName("user");
            api.findByUsername = findByUsername;
            api.findByCredentials = findByCredentials;
            api.login = login;
            api.logout = logout;
            api.register = register;

            return api;

            function findByUsername(username) {
                return api.findByParams({"username": username});
            }

            function findByCredentials(username, password) {
                return api.findByParams({"username": username, "password": password});
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
