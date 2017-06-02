/**
 * Created by DylanWight on 5/31/17.
 */
function CommonService(app, objectName, objects) {

    app.get('/api/' + objectName, findByParams);
    app.post('/api/' + objectName, create);
    app.get('/api/' + objectName + '/:id', findById);
    app.put('/api/' + objectName + '/:id', update);
    app.delete('/api/' + objectName + '/:id', remove);

    var api = {
        "getById": getById
        // "create": create,
        // "findByParams": findByParams,
        // "findOneByParams": findOneByParams,
        // "findAllByParams": findAllByParams,
        // "findById": findById,
        // "update": update,
        // "remove": remove
    };
    return api;

    function getById(id) {
        for (var i = 0; i < objects.length; i++) {
            if (objects[i]._id === id) {
                return objects[i];
            }
        }
    }


    function create(req, res) {
        console.log("create", objectName);
        console.log(req.body);
        var newUser = req.body;
        newUser._id = newUser._id ? newUser._id : new Date().getTime() + "";
        objects.push(newUser);
        res.json(newUser);
    }

    function findByParams(req, res) {
        console.log(req.query);
        if (req.query.findOne) {
            findOneByParams(req, res);
        } else {
            findAllByParams(req, res);
        }
    }

    function findOneByParams(req, res) {
        console.log("findOneByParams", objectName, req.query);
        const keys = Object.keys(req.query);

        for (var i = 0; i < objects.length; i++) {
            if (keys.reduce(function (acc, key) {
                    return acc && (req.query[key] === objects[i][key] || key === "findOne")
                }, true)) {
                console.log(objects[i]);
                res.json(objects[i]);
                return;
            }
        }

        res.sendStatus(404);
    }

    function findAllByParams(req, res) {
        console.log("findAllByParams", objectName, req.query);
        const keys = Object.keys(req.query);
        var paramObjects = [];

        for (var i = 0; i < objects.length; i++) {
            if (keys.reduce(function (acc, key) {
                    return acc && (req.query[key] === objects[i][key] || key === "findOne")
                }, true)) {
                paramObjects.push(objects[i]);
            }
        }
        console.log(paramObjects);
        res.json(paramObjects);
    }

    function findById(req, res) {
        console.log("findById", objectName, req.params);

        const id = req.params.id;
        for (var i = 0; i < objects.length; i++) {
            if (objects[i]._id === id) {
                res.json(objects[i]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function update(req, res) {
        console.log("update", objectName);
        console.log(req.body);

        var id = req.params.id;
        var newUser = req.body;
        newUser._id = id;

        for (var i = 0; i < objects.length; i++) {
            if (objects[i]._id === id) {
                objects[i] = newUser;
                res.json(objects[i]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function remove(req, res) {
        console.log("delete", objectName, req.params.id);
        var id = req.params.id;

        for (var i = 0; i < objects.length; i++) {
            if (objects[i]._id === id) {
                var deletedUser = objects.splice(i, 1)[0];
                res.json(deletedUser);
                return;
            }
        }
        res.sendStatus(404);
    }
}

module.exports = CommonService;