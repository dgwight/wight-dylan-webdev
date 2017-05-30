/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            user._id = user._id ? user._id : new Date().getTime() + "";
            console.log(user._id);
            users.push(user);
            return user;
        }

        function findUserById(id) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === id)
                    return users[i];
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username)
                    return users[i];
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username && users[i].password === password)
                    return users[i];
            }
            return null;
        }

        function updateUser(userId, user) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    users[i] = user;
                    return users[i];
                }
            }
        }

        function deleteUser(userId) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    users.splice(i, 1);
                }
            }
        }
    }
})();
