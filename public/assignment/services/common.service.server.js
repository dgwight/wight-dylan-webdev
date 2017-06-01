// /**
//  * Created by DylanWight on 5/31/17.
//  */
// function CommonService() {
//
//     var objectName = "";
//
//     app.get('/api/user', findUserByCredentials);
//     app.post('/api/user', create);
//     app.get('/api/user/:userId', findById);
//     app.put('/api/user/:userId', update);
//     app.delete('/api/user/:userId', remove);
//
//     var objects = [];
//
//     function create(req, res) {
//         console.log("createUser");
//         console.log(req.body);
//         var newUser = req.body;
//         newUser._id = newUser._id ? newUser._id : new Date().getTime() + "";
//         objects.push(newUser);
//         res.json(newUser);
//     }
//
//     // function findUserByUsername(req, res) {
//     // can't route based on query params
//     //     console.log("findUserByUsername");
//     //     console.log(req);
//     //     res.send(objects);
//     // }
//
//     function findUserByCredentials(req, res) {
//         console.log("findUserByCredentials", req.query);
//
//         const username = req.query.username;
//         const password = req.query.password;
//
//         for (var i = 0; i < objects.length; i++) {
//             if (objects[i].username === username && (objects[i].password === password || !password)) {
//                 res.json(objects[i]);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//     }
//
//     function findById(req, res) {
//         console.log("findUserById", req.params);
//
//         const userId = req.params.userId;
//         for (var i = 0; i < objects.length; i++) {
//             if (objects[i]._id === userId) {
//                 res.json(objects[i]);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//     }
//
//     function update(req, res) {
//         console.log("updateUser");
//         console.log(req.body);
//
//         var userId = req.params.userId;
//         var newUser = req.body;
//         newUser._id = userId;
//
//         for (var i = 0; i < objects.length; i++) {
//             if (objects[i]._id === userId) {
//                 objects[i] = newUser;
//                 res.json(objects[i]);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//     }
//
//     function remove(req, res) {
//         console.log("deleteUser", req.params.userId);
//         var userId = req.params.userId;
//
//         for (var i = 0; i < objects.length; i++) {
//             if (objects[i]._id === userId) {
//                 var deletedUser = objects.splice(i, 1)[0];
//                 res.json(deletedUser);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//     }
// }
//
// CommonService.prototype.fromID = function () { /* ... */ };
//
// module.exports = CommonService;