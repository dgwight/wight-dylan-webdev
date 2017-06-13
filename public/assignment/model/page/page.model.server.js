/**
 * Created by DylanWight on 6/11/17.
 */
const mongoose = require("mongoose");
const CommonModel = require('../common.model.server');
const WebsiteModel = require('../website/website.model.server')();
const WidgetModel = require('../widget/widget.model.server')();

function PageModel() {
    const PageSchema = require("../page/page.schema.server");
    const Model = mongoose.model("Page", PageSchema);
    const PageModel = new CommonModel(Model);
    PageModel.create = create;
    PageModel.getWidgets = getWidgets;
    return PageModel;

    function create(page) {
        return Model.create(page).then((page) => {
            WebsiteModel.add(page._website, page._id, "pages");
            return page;
        });
    }

    function getWidgets(id) {
        return PageModel.findById(id).then((page) => {
             const widgetIds = page.widgets.map(function(widget) {
                return mongoose.Types.ObjectId(widget._id);
            });

            return mongoose.model("Widget", WidgetSchema).find( { _id: { $in : widgetIds } } );

        }).then((widgets) => {
            return widgets;
        });
    }
}

module.exports = PageModel();