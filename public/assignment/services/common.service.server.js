/**
 * Created by DylanWight on 5/31/17.
 */
function CommonService(app, Model, routeName) {
    console.log("service", routeName);

    app.get('/api/' + routeName, find);
    app.get('/api/' + routeName + '/:id', findById);
    app.post('/api/' + routeName, create);
    app.put('/api/' + routeName + '/:id', update);
    app.delete('/api/' + routeName + '/:id', remove);

    function find(req, res) {
        console.log(req.url, req.body);
        Model.find(req.query).then((err, doc) => respond(err, doc, res));
    }

    function findById(req, res) {
        console.log(req.url, req.params);
        Model.findById(req.params.id).then((err, doc) => respond(err, doc, res));
    }

    function create(req, res) {
        console.log(req.url, req.body);
        Model.create(req.body).then((err, doc) => respond(err, doc, res));
    }

    function update(req, res) {
        console.log(req.url, req.body);
        Model.update(req.params.id, req.body).then((err, doc) => respond(err, doc, res));
    }

    function remove(req, res) {
        console.log(req.url, req.body);
        Model.remove(req.params.id).then((err, doc) => respond(err, doc, res));
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

module.exports = CommonService;