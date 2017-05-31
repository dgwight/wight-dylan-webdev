/**
 * Created by DylanWight on 5/31/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("CommonService", CommonService);

    function CommonService($http) {

        var objects = [];

        var objectName = "";

        var api = {
            "setObjectName": setObjectName,
            "create": create,
            "findById": findById,
            "findByParams": findByParams,
            "update": update,
            "remove": remove
        };
        return api;

        function setObjectName(name) {
            objectName = name;
        }

        function create(object) {
            var url = "/api/" + objectName + "/";
            return $http.post(url, object)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }

        function findById(id) {
            var url = "/api/" + objectName + "/" + id;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findByParams(params) {
            var url = "/api/" + objectName + "?"
                + Object.keys(params).map(function (key) {
                    return key + "=" + params[key];
                }).join('&');

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function update(id, object) {
            var url = "/api/" + objectName + "/" + id;
            return $http.put(url, object)
                .then(function (response) {
                    return response.data;
                });
        }

        function remove(id) {
            var url = "/api/" + objectName + "/" + id;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
