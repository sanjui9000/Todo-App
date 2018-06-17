var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodosSchema = new Schema({
    userId: Number,
    id: Number,
    title: String,
    completed: Boolean
});

mongoose.model('Todos', TodosSchema);