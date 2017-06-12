/**
 * Created by DylanWight on 6/11/17.
 */
const mongoose = require("mongoose");
const WebsiteSchema = require("../website/website.schema.server.js");

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [WebsiteSchema],
    dateCreated: {type: Date, default: Date.now}
});

module.exports = UserSchema;