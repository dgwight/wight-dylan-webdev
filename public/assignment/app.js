/**
 * Created by DylanWight on 5/23/17.
 */
var app = angular.module("WebAppMaker", []);

app.controller("WebAppMakerController", WebAppMakerController);

function WebAppMakerController($scope) {
    $scope.hello = "Hello World from AngularJS";
}