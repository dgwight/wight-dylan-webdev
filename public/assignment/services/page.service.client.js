/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", function ($http, CommonService) {

            var api = Object.create(CommonService);
            api.setObjectName("page");
            api.findByWebsite = findByWebsite;

            return api;

            function findByWebsite(websiteId) {
                var url = "/api/page?websiteId=" + websiteId;
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
        });
})();
