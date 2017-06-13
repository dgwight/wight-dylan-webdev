/**
 * Created by DylanWight on 6/11/17.
 */
const mongoose = require("mongoose");
const PageSchema = require("../page/page.schema.server.js");

const WidgetSchema = mongoose.Schema({
    _page: PageSchema,
    type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    order: {type: Number, default: Date.now},
    dateCreated: {type: Date, default: Date.now}
});

module.exports = WidgetSchema;