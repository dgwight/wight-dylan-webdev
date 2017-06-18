/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams["uid"];

        function init() {
            WebsiteService
                .findByUser(vm.uid)
                .then(function(websites) {
                    vm.websites = websites;
                 }).catch(function(error) {
                    vm.alert = "Websites not found, please try again";
                 });
        }

        init();
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findByUser(vm.uid)
                .then(function(websites) {
                    vm.websites = websites;
                }).catch(function(error) {
                    vm.alert = "Websites not found, please try again";
                });
        }

        init();

        function createWebsite(website) {
            if (!website || !website.name) {
                vm.alert = "Website name required";
                return;
            }

            WebsiteService
                .createWebsite(website, vm.uid)
                .then(function(website) {
                    $location.url("/user/" + vm.uid + "/website/"); //+ website._id +"/page");
                }).catch(function(error) {
                    vm.alert = "Unable to create website, please try again";
                });
        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findByUser(vm.uid)
                .then(function(websites) {
                    vm.websites = websites;
                }).catch(function(error) {
                vm.alert = "Websites not found, please try again";
            });

            WebsiteService
                .findById(vm.wid)
                .then(function(website) {
                    vm.website = JSON.parse(JSON.stringify(website));
                }).catch(function(error) {
                     vm.alert = "Website not found, please try again";
                });
        }

        init();

        function updateWebsite(website) {
            if (!website || !website.name) {
                vm.alert = "Website name required";
                return;
            }

            WebsiteService
                .update(vm.wid, website)
                .then(function(website) {
                    $location.url("/user/" + vm.uid + "/website/");
                }).catch(function(error) {
                    vm.alert = "Unable to update website, please try again";
                });
        }

        function deleteWebsite() {
            WebsiteService
                .remove(vm.wid)
                .then(function(website) {
                    $location.url("/user/" + vm.uid + "/website/");
                }).catch(function(error) {
                    vm.alert = "Unable to delete website, please try again";
                });
        }
    }

})();
