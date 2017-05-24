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
        vm.userId = $routeParams["userId"];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();
    }

    function NewWebsiteController() {

    }

    function EditWebsiteController() {

    }

})();
