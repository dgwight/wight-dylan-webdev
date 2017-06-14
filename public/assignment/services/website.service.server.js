/**
 * Created by DylanWight on 5/30/17.
 */

function WebsiteService (app) {
    const CommonService = require('./common.service.server');
    const WebsiteModel = require("../model/website/website.model.server")();
    this.prototype = new CommonService(app, WebsiteModel, "website");
}

module.exports = WebsiteService;