/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", function ($http, CommonService) {

            var api = Object.create(CommonService);
            api.setObjectName("website");
            api.findByUser = findByUser;

            return api;

            function findByUser(userId) {
                var url = "/api/website?userId=" + userId;
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
        });
})();
