/**
 * Created by DylanWight on 5/30/17.
 */
const CommonService = require('./common.service.server');

function WebsiteService (app) {
    const WebsiteModel = require("../model/website/website.model.server")();
    this.prototype = new CommonService(app, WebsiteModel, "website");
}

module.exports = WebsiteService;