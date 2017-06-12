/**
 * Created by DylanWight on 6/11/17.
 */
const mongoose = require("mongoose");
const CommonModel = require('../common.model.server');
const UserModel = require('../user/user.model.server')();
const WebsiteSchema = require("../website/website.schema.server");

function WebsiteModel () {
    this.prototype = new CommonModel(mongoose.model("Website", WebsiteSchema));
    this.prototype.createWebsite = function(website) {
        this.prototype.create(website).then((website) => {
            return UserModel.add(website._user, website, "websites");
        });
    };

    return this.prototype;
}

module.exports = WebsiteModel;