/**
 * Created by DylanWight on 5/30/17.
 */
module.exports = function(app) {

    app.get('/api/page', findUserById);

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];

    function findUserById(req, res) {
        res.send(pages);
    }
};