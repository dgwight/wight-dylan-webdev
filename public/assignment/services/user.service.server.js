/**
 * Created by DylanWight on 5/30/17.
 */
module.exports = function(app) {

    app.get('/api/user', findByParams);
    app.post('/api/user', create);
    app.get('/api/user/:userId', findById);
    app.put('/api/user/:userId', update);
    app.delete('/api/user/:userId', remove);

    var objects = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function create(req, res) {
        console.log("createUser");
        console.log(req.body);
        var newObject = req.body;
        newObject._id = newObject._id ? newObject._id : new Date().getTime() + "";
        objects.push(newObject);
        res.json(newObject);
    }

    function findByParams(req, res) {
        console.log("findUserByParams", req.query);

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
        console.log("findUserById", req.params);

        const userId = req.params.userId;
        for (var i = 0; i < objects.length; i++) {
            if (objects[i]._id === userId) {
                res.json(objects[i]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function update(req, res) {
        console.log("updateUser");
        console.log(req.body);

        var userId = req.params.userId;
        var newObject = req.body;
        newObject._id = userId;

        for (var i = 0; i < objects.length; i++) {
            if (objects[i]._id === userId) {
                objects[i] = newObject;
                res.json(objects[i]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function remove(req, res) {
        console.log("deleteUser", req.params.userId);
        var userId = req.params.userId;

        for (var i = 0; i < objects.length; i++) {
            if (objects[i]._id === userId) {
                var deletedWebsite = objects.splice(i, 1)[0];
                res.json(deletedWebsite);
                return;
            }
        }
        res.sendStatus(404);
    }
};

