/**
 * Created by DylanWight on 5/23/17.
 */
// (function(){
//     angular
//         .module("WebAppMaker", ["ngRoute"]);
// })();

module.exports = function(app) {
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
};