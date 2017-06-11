/**
 * Created by DylanWight on 5/30/17.
 */

function UserService (app) {
    const CommonService = require('./common.service.server');
    const UserModel = require("../model/user/user.model.server")();
    this.prototype = new CommonService(app, UserModel, "user");
}

module.exports = UserService;

