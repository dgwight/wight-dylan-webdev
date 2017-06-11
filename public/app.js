/**
 * Created by DylanWight on 5/30/17.
 */

module.exports = function(app) {
    const mongoose = require("mongoose");
    mongoose.Promise = require('bluebird');

    require("./assignment/services/user.service.server.js")(app);
    require("./assignment/services/website.service.server.js")(app);
    require("./assignment/services/page.service.server.js")(app);
    require("./assignment/services/widget.service.server.js")(app);
};