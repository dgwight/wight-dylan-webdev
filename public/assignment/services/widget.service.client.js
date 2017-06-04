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
            api.reorder = reorder;

            return api;

            function findByPage(pageId) {
                return api.findByParams({"pageId": pageId});
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

