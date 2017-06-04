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
                    console.log('update: '+ui.item.index(), attributes["wdDraggable"]);
                    var pageId = attributes["wdDraggable"];
                    WidgetService.reorder(pageId, initial, ui.item.index());
                },
                start: function(event, ui) {
                    console.log('start: ' + ui.item.index());
                    initial = ui.item.index();
                },
                stop: function(event, ui) {
                    console.log('stop: ' + ui.item.index());
                },
                end: function (e) {
                    console.log('end: ');
                    e.preventDefault();
                    $('.dropHint').remove();
                    var itemMoved = angular.copy($scope.content[e.oldIndex]);
                    scope.content.splice(e.oldIndex, 1);
                    scope.content.splice(e.newIndex, 0, itemMoved);
                    scope.$apply();
                }

            })
        }

        return {
            link: linkFunction
        }
    }
})();