/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", function ($http, CommonService) {

            const WebsiteService = CommonService("website");
            WebsiteService.findByUser = findByUser;
            WebsiteService.createWebsite = createWebsite;

            return WebsiteService;

            function createWebsite(website, userId) {
                website._user = userId;
                return WebsiteService.create(website);
            }

            function findByUser(userId) {
                return WebsiteService.findByParams({"_user": userId});
            }
        });
})();