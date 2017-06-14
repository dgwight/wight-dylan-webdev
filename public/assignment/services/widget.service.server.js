/**
 * Created by DylanWight on 5/30/17.
 */

function WidgetService (app) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    const CommonService = require('./common.service.server');
    const WidgetModel = require("../model/widget/widget.model.server")();
    const Model = new CommonService(app, WidgetModel, "widget");

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put('/api/page/:pid/widget', reorder);

    function uploadImage(req, res) {
        const widgetId      = req.body.widgetId;
        const width         = req.body.width;
        const myFile        = req.file;

        const userId = req.body.userId;
        const websiteId = req.body.websiteId;
        const pageId = req.body.pageId;

        const originalname  = myFile.originalname; // file name on user's computer
        const filename      = myFile.filename;     // new file name in upload folder
        const path          = myFile.path;         // full path of uploaded file
        const destination   = myFile.destination;  // folder where file is saved to
        const size          = myFile.size;
        const mimetype      = myFile.mimetype;

        WidgetModel.update(widgetId, {url: '/public/uploads/' + filename})
            .then((widget) => {
                const callbackUrl = "/assignment/index.html#/user/" + userId + "/website/" + websiteId
                    + "/page/" + pageId + "/widget/" + widgetId;
                res.redirect(callbackUrl);
            });
    }

    function reorder(req, res) {
        console.log("reorder");
        const initial = req.query.initial;
        const final = req.query.final;
        const pageId = req.params.pid;

        WidgetModel.find({_page: pageId})
            .then((widgets) => {
                const preorder = final > 0 ? widgets[final - 1].order : 0;
                const order = (final == widgets.length - 1) ? new Date().getTime() : (preorder + widgets[final].order) / 2;
                return WidgetModel.update(widgets[initial]._id, {order: order})
            }).then((widget) => {
                console.log(widget.order);
                res.json(widget)
            });
    }
}

module.exports = WidgetService;