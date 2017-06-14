/**
 * Created by DylanWight on 6/11/17.
 */
const mongoose = require("mongoose");
const CommonModel = require('../common.model.server');

function UserModel() {
    const UserSchema = require("../user/user.schema.server");
    const Model = mongoose.model("User", UserSchema);
    const UserModel = new CommonModel(Model);
    UserModel.create = create;
    UserModel.findByFacebookId = findByFacebookId;

    return UserModel;

    function create(user) {
        return Model.create(user).then((user) => {
            return user;
        });
    }

    function findByFacebookId(facebookId) {
        return Model.findOne({'facebook.id': facebookId});
    }
}

module.exports = UserModel;