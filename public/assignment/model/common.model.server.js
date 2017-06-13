/**
 * Created by DylanWight on 6/11/17.
 */
function CommonModel(Model) {

    const api = {
        "model": Model,
        "find": find,
        "findById": findById,
        "update": update,
        "remove": remove,
        "add": add
    };
    return api;

    function find(query) {
        console.log("findByParams", Model.modelName, query);
        return Model.find(query).sort( { order: 1 } );
    }

    function findById(id) {
        console.log("findById", Model.modelName, id);
        return Model.findById(id);
    }

    function update(id, object) {
        console.log("update", Model.modelName, id, object);
        return Model.findByIdAndUpdate(id, object, {new: true});
    }

    function remove(id) {
        console.log("remove", Model.modelName, id);
        return Model.findByIdAndRemove(id);
    }

    function add(id, object, fieldName) {
        console.log("add", Model.modelName, id, object, fieldName);
        var push = {};
        push[fieldName] = object;
        return Model.findByIdAndUpdate(
                id,
                {$push: push},
                {safe: true, upsert: true},
                function(err, model) {
                    console.log(err);
                }
            );
    }
}

module.exports = CommonModel;