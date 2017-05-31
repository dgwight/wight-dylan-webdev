/**
 * Created by DylanWight on 5/30/17.
 */

module.exports = function(app) {
    // require("./assignment/services/common.service.server.js")(app);
    require("./assignment/services/user.service.server.js")(app);
    require("./assignment/services/website.service.server.js")(app);
    require("./assignment/services/page.service.server.js")(app);
    require("./assignment/services/widget.service.server.js")(app);
};