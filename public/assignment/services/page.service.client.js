/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];
        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.append(page);
        }

        function findPageByWebsiteId(websiteId) {
            var websitePages = [];
            for (page in pages) {
                if (page.websiteId === websiteId)
                    websitePages.append(website);
            }
            return websitePages;
        }

        function findPageById(pageId) {
            for (page in pages) {
                if (page._id === pageId)
                    return page;
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (p in pages) {
                if (p._id === page) {
                    p = page;
                    return;
                }
            }
        }

        function deletePage(pageId) {
            for (var i = 0; i < pages.length - 1; i++) {
                if (pages[i]._id === pageId) {
                    websites.splice(i, 1);
                }
            }
        }
    }
})();
