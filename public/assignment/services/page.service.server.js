/**
 * Created by DylanWight on 5/30/17.
 */
function PageService (app) {
    const CommonService = require('./common.service.server');
    const PageModel = require("../model/page/page.model.server");
    this.prototype = new CommonService(app, PageModel, "page");
}

module.exports = PageService;