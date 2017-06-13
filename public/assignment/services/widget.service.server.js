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
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        widget = Model.getById(widgetId);
        widget.url = '/public/uploads/' + filename;
        var callbackUrl = "/assignment/index.html#/user/" + userId + "/website/" + websiteId
            + "/page/" + pageId + "/widget/" + widgetId;

        res.redirect(callbackUrl);
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

    function respond(err, doc, res) {
        if (err)
            res.send(err);
        else if (doc)
            res.json(doc);
        else
            res.sendStatus(404);
    }
}

module.exports = WidgetService;