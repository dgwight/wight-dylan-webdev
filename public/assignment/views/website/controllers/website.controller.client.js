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
            website = WebsiteService.createWebsite(vm.uid, website);
            if (website) {
                $location.url("/user/" + vm.uid + "/website/"); //+ website._id +"/page");
            }
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
                     vm.alert = "Websites not found, please try again";
                });
        }

        init();

        function updateWebsite(website) {
            website = WebsiteService.updateWebsite(vm.wid, website);
            if (website) {
                $location.url("/user/" + vm.uid + "/website/");
            }
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.wid);
            $location.url("/user/" + vm.uid + "/website/");
        }
    }

})();
