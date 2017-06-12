/**
 * Created by DylanWight on 6/11/17.
 */
const mongoose = require("mongoose");
const UserSchema = require("../user/user.schema.server.js");
const PageSchema = require("../page/page.schema.server.js");

const WebsiteSchema = mongoose.Schema({
    _user: UserSchema,
    name: String,
    description: String,
    pages: [PageSchema],
    dateCreated: {type: Date, default: Date.now}
});

module.exports = WebsiteSchema;