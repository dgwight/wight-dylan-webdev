/**
 * Created by DylanWight on 6/11/17.
 */
const mongoose = require("mongoose");
const CommonModel = require('../common.model.server');
const WebsiteModel = require('../website/website.model.server')();

function PageModel() {
    const PageSchema = require("../page/page.schema.server");
    const Model = mongoose.model("Page", PageSchema);
    const PageModel = new CommonModel(Model);
    PageModel.create = create;
    return PageModel;

    function create(page) {
        return Model.create(page).then((page) => {
            WebsiteModel.add(page._website, page._id, "pages");
            return page;
        });
    }
}

module.exports = PageModel;