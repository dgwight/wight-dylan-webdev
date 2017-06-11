/**
 * Created by DylanWight on 6/11/17.
 */
const mongoose = require("mongoose");

var UserSchema = require("../widget/website.schema.server.js")();
var PageSchema = require("../widget/website.schema.server.js")();

const WebsiteSchema = mongoose.Schema({
    _user: UserSchema,
    name: String,
    description: String,
    pages: [PageSchema],
    dateCreated: {type: Date, default: Date.now}
});

module.exports = WebsiteSchema;