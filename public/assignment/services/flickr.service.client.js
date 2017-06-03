/**
 * Created by DylanWight on 6/3/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {
        const key = "7cc51e0f994c018b679b9cc0672d4726";
        const secret = "0d51c679014eea4f";
        const urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            "searchPhotos": searchPhotos
        };

        console.log("FlickrService");

        return api;

        function searchPhotos(searchTerm) {
            console.log("searchPhotos FlickrService");
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            var result =  $http.get(url);
            console.log(url, result);
            return result;
        }
    }

})();