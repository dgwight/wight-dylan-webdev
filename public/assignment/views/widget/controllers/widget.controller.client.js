/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function WidgetListController($routeParams, WidgetService, $sce) {

        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];

        vm.trustThisContent = trustThisContent;
        vm.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
        vm.getUrlForWidgetType = getUrlForWidgetType;

        function init() {
            WidgetService
                .findByPage(vm.pid)
                .then(function(widgets) {
                    vm.widgets = widgets;
                }).catch(function(error) {
                    vm.alert = "Widgets not found, please try again";
                });
        }

        init();

        function trustThisContent(html) {
            //TODO: diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }

        function getYoutubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://youtube.com/embed/';
            var regex = /([\/\=])/;
            var youTubeLinkParts = youTubeLink.split(regex);
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl = embedUrl + id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function getUrlForWidgetType(type) {
            return 'views/widget/templates/widget-' + type.toLowerCase() + '.view.client.html';
        }
    }

    function NewWidgetController($routeParams, $location, WidgetService) {

        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];

        vm.createWidget = createWidget;

        function createWidget(widget) {
            widget._page = vm.pid;
            WidgetService
                .create(widget)
                .then(function(widget) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
                }).catch(function(error) {
                    vm.alert = "Could not create widget, please try again";
                });
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
            WidgetService
                .findById(vm.wgid)
                .then(function(widget) {
                    vm.widget = JSON.parse(JSON.stringify(widget));
                }).catch(function(error) {
                    vm.alert = "Widget not found, please try again";
                });
        }

        init();

        function updateWidget(widget) {
            WidgetService
                .update(vm.wgid, widget)
                .then(function(widget) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
                }).catch(function(error) {
                    vm.alert = "Could not update widget, please try again";
                });
        }

        function createWidget(widget) {
            widget._page = vm.pid;
            WidgetService
                .create(widget)
                .then(function(widget) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
                }).catch(function(error) {
                    vm.alert = "Could not create widget, please try again";
                });
        }

        function deleteWidget() {
            WidgetService
                .remove(vm.wgid)
                .then(function(widget) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
                }).catch(function(error) {
                    vm.alert = "Could not delete widget, please try again";
                });
        }
    }

    function FlickrImageSearchController($location, $routeParams, FlickrService, WidgetService) {
        console.log("FlickrImageSearchController");

        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        vm.wgid = $routeParams["wgid"];
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init() {
            WidgetService
                .findById(vm.wgid)
                .then(function(widget) {
                    vm.widget = JSON.parse(JSON.stringify(widget));
                }).catch(function(error) {
                vm.alert = "Widget not found, please try again";
            });
        }

        init();

        function searchPhotos(searchTerm) {
            console.log("searchPhotos");
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            console.log("selectPhoto");

            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            vm.widget.url = url;
            WidgetService
                .update(vm.widget._id, vm.widget)
                .then(function(widget) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.wgid);
                });
        }
    }

})();
