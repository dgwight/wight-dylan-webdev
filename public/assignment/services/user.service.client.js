/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];
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
            users.append(user);
        }

        function findUserById(id) {
            for (user in users) {
                if (user._id === id)
                    return user;
            }
            return null;
        }

        function findUserByUsername(username) {
            for (user in users) {
                if (user.username === username)
                    return user;
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (user in users) {
                if (user.username === username && user.password === password)
                    return user;
            }
            return null;
        }

        function updateUser(userId, user) {
            for (u in users) {
                if (u._id === userId) {
                    u = user;
                    return;
                }
            }
        }

        function deleteUser(userId) {
            for (var i = 0; i < users.length - 1; i++) {
                if (users[i]._id === userId) {
                    users.splice(i, 1);
                }
            }
        }
    }
})();
