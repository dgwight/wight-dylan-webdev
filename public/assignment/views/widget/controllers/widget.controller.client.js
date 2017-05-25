/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {

        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];

        vm.trustThisContent = trustThisContent;
        vm.getYoutubeEmbedUrl = getYoutubeEmbedUrl;


        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        }

        init();

        function trustThisContent(html) {
            //TODO: diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }

        function getYoutubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl = embedUrl + id;
            return $sce.trustAsResourceUrl(embedUrl);
        }
    }

    function NewWidgetController($routeParams, $location, WidgetService) {

        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];

        vm.createWidget = createWidget;

        function createWidget(widget) {
            widget = WidgetService.createWidget(vm.pid, widget);
            if (widget) {
                $location.url("/user/" + vm.uid + "/website/"  + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
            } else {
                vm.error = "Unable to create widget";
            }
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {

        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        vm.wgid = $routeParams["wgid"];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.createWidget = createWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);
        }

        init();

        function updateWidget(widget) {
            widget = WidgetService.updateWidget(vm.wgid, widget);
            if (widget) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
            } else {
                vm.error = "Unable to edit widget";
            }
        }

        function createWidget(widget) {
            widget = WidgetService.createWidget(vm.pid, widget);
            if (widget) {
                $location.url("/user/" + vm.uid + "/website/"  + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
            } else {
                vm.error = "Unable to create widget";
            }
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.wgid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
        }
    }

})();
