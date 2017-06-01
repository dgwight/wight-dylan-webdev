/**
 * Created by DylanWight on 5/31/17.
 */
function CommonService(app, objects, objectName) {

    var objectName = objectName;
    var objects = objects;

    app.get('/api/' + objectName, findByCredentials);
    app.post('/api/' + objectName, create);
    app.get('/api/' + objectName + '/:id', findById);
    app.put('/api/' + objectName + '/:id', update);
    app.delete('/api/' + objectName + '/:id', remove);

    function create(req, res) {
        console.log("create", objectName);
        console.log(req.body);
        var newUser = req.body;
        newUser._id = newUser._id ? newUser._id : new Date().getTime() + "";
        objects.push(newUser);
        res.json(newUser);
    }

    function findByCredentials(req, res) {
        console.log("findByCredentials", objectName, req.query);

        const username = req.query.username;
        const password = req.query.password;

        for (var i = 0; i < objects.length; i++) {
            if (objects[i].username === username && (objects[i].password === password || !password)) {
                res.json(objects[i]);
                return;
            }
        }
        res.sendStatus(404);
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