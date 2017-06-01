/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", function ($http, CommonService) {

            var api = Object.create(CommonService);
            api.setObjectName("website");
            api.findByUser = findByUser;

            return api;

            function findByUser(userId) {
                return api.findByParams({"userId": userId});
            }
        });
})();