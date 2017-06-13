/**
 * Created by DylanWight on 6/11/17.
 */
const mongoose = require("mongoose");
const CommonModel = require('../common.model.server');
const PageModel = require('../page/page.model.server')();

function WidgetModel () {
    const WidgetSchema = require("../widget/widget.schema.server");
    const Model = mongoose.model("Widget", WidgetSchema);
    const WidgetModel = new CommonModel(Model);
    WidgetModel.create = create;
    return WidgetModel;

    function create(widget) {
        return Model.create(widget).then((widget) => {
            PageModel.add(widget._page, widget._id, "widgets");
            return widget;
        });
    }
}

module.exports = WidgetModel;