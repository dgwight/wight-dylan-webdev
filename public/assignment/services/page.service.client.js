/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", function ($http, CommonService) {

            const PageService = CommonService("page");
            PageService.findByWebsite = findByWebsite;
            return PageService;

            function findByWebsite(websiteId) {
                return PageService.findByParams({"_website": websiteId});
            }
        });
})();
