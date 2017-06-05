/**
 * Created by DylanWight on 6/3/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .directive("wdDraggable", wdDraggable);

    function wdDraggable(WidgetService) {

        function linkFunction(scope, element, attributes) {
            console.log(attributes, attributes["wdDraggable"]);
            var initial;
            $(element).sortable({
                update: function(event, ui) {
                    var pageId = attributes["wdDraggable"];
                    WidgetService.reorder(pageId, initial, ui.item.index());
                },
                start: function(event, ui) {
                    initial = ui.item.index();
                }
            })
        }

        return {
            link: linkFunction
        }
    }
})();