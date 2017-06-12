/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", function ($http, CommonService) {

            const api = Object.create(CommonService);
            api.setObjectName("website");
            api.findByUser = findByUser;
            api.createWebsite = createWebsite;

            return api;

            function createWebsite(website, userId) {
                website._user = userId;
                return api.create(website);
            }

            function findByUser(userId) {
                return api.findByParams({"_user": userId});
            }
        });
})();