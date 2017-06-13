/**
 * Created by DylanWight on 6/11/17.
 */
const mongoose = require("mongoose");
const CommonModel = require('../common.model.server');
const UserModel = require('../user/user.model.server')();
const WebsiteSchema = require("../website/website.schema.server");

function WebsiteModel () {
    const Model = mongoose.model("Website", WebsiteSchema);
    var WebsiteModel = new CommonModel(Model);
    WebsiteModel.create = create;
    return WebsiteModel;

    function create(website) {
        return Model.create(website).then((website) => {
            UserModel.add(website._user, website, "websites");
        });
    }
}

module.exports = WebsiteModel;