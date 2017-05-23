/**
 * Created by DylanWight on 5/23/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService() {
        var websites = [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ]
        ;
        var api = {
            "createWebsite"   : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        };
        return api;

        function createWebsite(userid, website) {
            website.developerId = userid;
            websites.append(website);
        }
        function findWebsitesByUser(userId) {
            var userWebsites = [];
            for (website in websites) {
                if (website.developerId === userId)
                    userWebsites.append(website);
            }
            return userWebsites;
        }
        function findWebsiteById(websiteId) {
            for (website in websites) {
                if (website._id === websiteId)
                    return website;
            }
            return null;
        }
        function updateWebsite(websiteId, website) {
            for (ws in websites) {
                if (ws._id === websiteId) {
                    ws = website;
                    return;
                }
            }
        }
        function deleteWebsite(websiteId) {
            for(var i = 0; i < websites.length - 1; i++) {
                if(websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                }
            }
        }
    }
})();
