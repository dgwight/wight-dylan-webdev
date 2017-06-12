/**
 * Created by DylanWight on 5/30/17.
 */
const CommonService = require('./common.service.server');

function WebsiteService (app) {
    const WebsiteModel = require("../model/website/website.model.server")();

    this.prototype = new CommonService(app, WebsiteModel, "website");
    app.post('/api/' + "website", create);

    function create(req, res) {
        console.log(req.url, req.body);
        WebsiteModel.createWebsite(req.body).then((err, doc) => respond(err, doc, res));
    }
}

module.exports = WebsiteService;