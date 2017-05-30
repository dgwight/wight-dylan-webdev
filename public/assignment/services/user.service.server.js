/**
 * Created by DylanWight on 5/30/17.
 */
module.exports = function(app) {

    app.get('/api/user', findUserByCredentials);
    app.post('/api/user', createUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function createUser(req, res) {
        console.log("createUser");
        console.log(req.body);
        var newUser = req.body;
        user._id = user._id ? user._id : new Date().getTime() + "";
        users.push(newUser);
        res.json(newUser);
    }

    // function findUserByUsername(req, res) {
    // can't route based on query params
    //     console.log("findUserByUsername");
    //     console.log(req);
    //     res.send(users);
    // }

    function findUserByCredentials(req, res) {
        const username = req.query.username;
        const password = req.query.password;

        for (var i = 0; i < users.length; i++) {
            if (users[i].username === username && (users[i].password === password || !password)) {
                res.json(users[i]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findUserById(req, res) {
        const userId = req.params.userId;
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id === userId) {
                res.json(users[i]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateUser(req, res) {
        console.log("updateUser");
        console.log(req.body);

        var userId = req.params.userId;
        var newUser = req.body;
        newUser._id = userId;

        for (var i = 0; i < users.length; i++) {
            if (users[i]._id === userId) {
                users[i] = newUser;
                res.json(users[i]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteUser(req, res) {
        console.log("deleteUser", req.params.userId);
        var userId = req.params.userId;

        for (var i = 0; i < users.length; i++) {
            if (users[i]._id === userId) {
                var deletedUser = users.splice(i, 1)[0];
                res.json(deletedUser);
                return;
            }
        }
        res.sendStatus(404);
    }
};