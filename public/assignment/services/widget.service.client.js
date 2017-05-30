/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService() {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            widget._id = widget._id ? widget._id : new Date().getTime() + "";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget;
        }

        function findWidgetsByPageId(pageId) {
            var pageWidgets = [];
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i].pageId === pageId)
                    pageWidgets.push(widgets[i]);
            }
            return pageWidgets;
        }

        function findWidgetById(widgetId) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id === widgetId)
                    return widgets[i];
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id === widgetId) {
                    widgets[i] = widget;
                    return widgets[i];
                }
            }
        }

        function deleteWidget(widgetId) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                }
            }
        }
    }
})();
