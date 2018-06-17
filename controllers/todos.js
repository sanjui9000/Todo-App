var mongoose = require('mongoose');
var Todos = mongoose.model('Todos');

exports.findAll = function (req, res) {
    Todos.find({}, function (err, results) {
        return res.send(results);
    });
};

exports.import = function (req, res) {
    Todos.create(
        {"userId": 1, "id": 1, "title": "Eat food", "completed": false},
        {"userId": 1, "id": 2, "title": "Attend meeting", "completed": true},
        {"userId": 1, "id": 3, "title": "Do daily chores", "completed": false},
        {"userId": 1, "id": 4, "title": "Clean kitchen", "completed": true},
        {"userId": 1, "id": 5, "title": "Finish homeworks", "completed": false},
        {"userId": 1, "id": 6, "title": "Complete projects", "completed": false},
        {"userId": 1, "id": 7, "title": "Play badminton", "completed": false},
        {"userId": 1, "id": 8, "title": "Cook food", "completed": false}
        , function (err) {
            if (err) return console.log(err);
            return res.send(202);
        });
};

exports.findById = function (req, res) {
    var id = req.params.id;
    Todos.findOne({'id': id}, function (err, result) {
        return res.send(result);
    });
};

exports.add = function (req, res) {
    Todos.create(req.body, function (err, todos) {
        if (err) return console.log(err);
        return res.send(todos);
    });
};

exports.update = function (req, res) {
    var id = req.params.id;
    var updates = req.body;

    Todos.update({"id": id}, req.body,
        function (err, numberAffected) {
            if (err) return console.log(err);
            return res.send(202);
        });
};

exports.delete = function (req, res) {
    var id = req.params.id;
    Todos.remove({'id': id}, function (result) {
        return res.send(result);
    });
};

exports.deleteAll = function (req, res) {
    Todos.remove({}, function(result) {
        return res.send(result);
    });
};