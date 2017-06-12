/**
 * Created by DylanWight on 5/30/17.
 */

module.exports = function(app) {
    const connectionString = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://127.0.0.1:27017/web-dev';
    const mongoose = require("mongoose");
    mongoose.Promise = require('bluebird');
    mongoose.createConnection(connectionString, function (err, res) {
        if (err) {
            console.log('ERROR connecting to: ' + connectionString + '. ' + err);
        } else {
            console.log('Succeeded connected to: ' + connectionString);

            require("./assignment/services/user.service.server.js")(app);
            require("./assignment/services/website.service.server.js")(app);
            require("./assignment/services/page.service.server.js")(app);
            require("./assignment/services/widget.service.server.js")(app);
        }
    });
};