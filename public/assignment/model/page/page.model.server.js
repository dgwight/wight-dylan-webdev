/**
 * Created by DylanWight on 6/11/17.
 */
const mongoose = require("mongoose");
const CommonModel = require('../common.model.server');

function PageModel() {
    const PageSchema = require("../page/page.schema.server");
    this.prototype = new CommonModel(mongoose.model("Page", PageSchema));
    return this.prototype;
}

module.exports = PageModel;