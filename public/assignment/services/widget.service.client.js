/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", function ($http, CommonService) {

            var api = Object.create(CommonService);
            api.setObjectName("widget");
            api.findByPage = findByPage;

            return api;

            function findByPage(pageId) {
                return api.findByParams({"pageId": pageId});
            }
        });
})();

