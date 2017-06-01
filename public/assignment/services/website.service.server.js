// /**
//  * Created by DylanWight on 5/30/17.
//  */
// module.exports = function(app) {
//
//     app.get('/api/website', findByParams);
//     app.post('/api/website', create);
//     app.get('/api/website/:websiteId', findById);
//     app.put('/api/website/:websiteId', update);
//     app.delete('/api/website/:websiteId', remove);
//
//     var objects = [
//         {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
//         {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
//         {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
//         {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
//         {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
//         {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
//         {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
//     ];
//
//     function create(req, res) {
//         console.log("createWebsite");
//         console.log(req.body);
//         var newObject = req.body;
//         newObject._id = newObject._id ? newObject._id : new Date().getTime() + "";
//         objects.push(newObject);
//         res.json(newObject);
//     }
//
//     function findByParams(req, res) {
//         console.log("findWebsiteByCredentials", req.query);
//         const userId = req.query.websiteId;
//         var userWebsites = [];
//
//         for (var i = 0; i < objects.length; i++) {
//             if (objects[i].userId === userId) {
//                 userWebsites.push(objects[i]);
//             }
//         }
//         res.json(userWebsites);
//     }
//
//     function findById(req, res) {
//         console.log("findWebsiteById", req.params);
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
//         console.log("updateWebsite");
//         console.log(req.body);
//
//         var websiteId = req.params.websiteId;
//         var newObject = req.body;
//         newObject._id = websiteId;
//
//         for (var i = 0; i < objects.length; i++) {
//             if (objects[i]._id === websiteId) {
//                 objects[i] = newObject;
//                 res.json(objects[i]);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//     }
//
//     function remove(req, res) {
//         console.log("removeWebsite", req.params.userId);
//         var websiteId = req.params.websiteId;
//
//         for (var i = 0; i < objects.length; i++) {
//             if (objects[i]._id === websiteId) {
//                 var deletedObject = objects.splice(i, 1)[0];
//                 res.json(deletedObject);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//     }
// };

var CommonService = require('./common.service.server');

function WebsiteService (app) {
    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
        {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    ];
    this.prototype = new CommonService(app, websites, "websites");
}

module.exports = WebsiteService;