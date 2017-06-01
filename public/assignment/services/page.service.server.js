/**
 * Created by DylanWight on 5/30/17.
 */
var CommonService = require('./common.service.server');

function PageService (app) {
    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];
    this.prototype = new CommonService(app, "page", pages);
}

module.exports = PageService;