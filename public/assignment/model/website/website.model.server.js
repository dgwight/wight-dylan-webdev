/**
 * Created by DylanWight on 6/11/17.
 */
const mongoose = require("mongoose");
const CommonModel = require('../common.model.server');

function WebsiteModel () {
    const UserSchema = require("../user/user.schema.server");
    this.prototype = new CommonModel(mongoose.model("User", UserSchema));
    return this.prototype;
}

module.exports = WebsiteModel;