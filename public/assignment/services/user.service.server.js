/**
 * Created by DylanWight on 5/30/17.
 */
var CommonService = require('./common.service.server');

function UserService (app) {
    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];
    this.prototype = new CommonService(app, "user", users);
}

module.exports = UserService;

