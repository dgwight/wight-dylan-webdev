/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", function ($http, CommonService) {

            const WidgetService = CommonService("widget");
            WidgetService.findByPage = findByPage;
            WidgetService.reorder = reorder;
            return WidgetService;

            function findByPage(pageId) {
                return WidgetService.findByParams({"_page": pageId});
            }

            function reorder(pageId, initial, final) {
                var url = "/api/page/" + pageId + "/widget?initial=" + initial + "&final=" + final;
                console.log(url);
                return $http.put(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
        });
})();

