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

        var widgets = prototype.objects;
        var pageWidgetIndexes = [];
        console.log(req.query);

        for (var i = 0; i < widgets.length; i ++) {
            if (widgets[i].pageId === pageId)
                pageWidgetIndexes.push(i);
        }

        var moving = widgets.splice(pageWidgetIndexes[initial], 1)[0];
        widgets.splice(pageWidgetIndexes[final], 0, moving);
        res.json(moving);
    }
}

module.exports = WidgetService;