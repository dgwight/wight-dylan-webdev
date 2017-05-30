/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService() {

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            website._id = website._id ? website._id : new Date().getTime() + "";
            website.developerId = userId;
            websites.push(website);
            return website;
        }

        function findWebsitesByUser(userId) {
            var userWebsites = [];
            for (var i = 0; i < websites.length; i++) {
                if (websites[i].developerId === userId)
                    userWebsites.push(websites[i]);
            }
            return userWebsites;
        }

        function findWebsiteById(websiteId) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id === websiteId)
                    return websites[i];
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id === websiteId) {
                    websites[i] = website;
                    return websites[i];
                }
            }
        }

        function deleteWebsite(websiteId) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                }
            }
        }
    }
})();
