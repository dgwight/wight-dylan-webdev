/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {

        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];

        function init() {
            PageService
                .findByWebsite(vm.wid)
                .then(function (pages) {
                    vm.pages = pages;
                }).catch(function (error) {
                    vm.alert = "Pages not found, please try again";
                });
        }

        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];

        vm.createPage = createPage;

        function init() {
            PageService
                .findByWebsite(vm.wid)
                .then(function (pages) {
                    vm.pages = pages;
                }).catch(function (error) {
                    vm.alert = "Pages not found, please try again";
                });
        }

        init();

        function createPage(page) {
            page._website = vm.wid;
            PageService
                .create(page)
                .then(function (page) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
                }).catch(function (error) {
                vm.error = "Unable to create page, please try again";
            });
        }
    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findByWebsite(vm.wid)
                .then(function (pages) {
                    vm.pages = pages;
                }).catch(function (error) {
                    vm.alert = "Pages not found, please try again";
                });

            PageService
                .findById(vm.pid)
                .then(function (page) {
                    vm.page = JSON.parse(JSON.stringify(page));
                }).catch(function (error) {
                    vm.alert = "Page not found, please try again";
                });
        }

        init();

        function updatePage(page) {
            PageService
                .update(vm.pid, page)
                .then(function (page) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
                }).catch(function (error) {
                    vm.error = "Unable to update page";
                });
        }

        function deletePage() {
            PageService
                .remove(vm.pid)
                .then(function (page) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
                }).catch(function (error) {
                    vm.error = "Unable to delete page";
                });
        }
    }

})();
