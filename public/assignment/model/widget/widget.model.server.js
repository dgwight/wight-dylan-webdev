/**
 * Created by DylanWight on 6/11/17.
 */
const mongoose = require("mongoose");
const CommonModel = require('../common.model.server');

function WidgetModel () {
    const WidgetSchema = require("../widget/widget.schema.server");
    this.prototype = new CommonModel(mongoose.model("Widget", WidgetSchema));
    return this.prototype;
}

module.exports = WidgetModel;