module.exports = function (app) {
    var todos = require('../controllers/todos');
    app.get('/todos', todos.findAll);
    app.get('/todos/:id', todos.findById);
    app.post('/todos', todos.add);
    app.put('/todos/:id', todos.update);
    app.delete('/todos/:id', todos.delete);
    app.get('/deleteAll', todos.deleteAll);
    app.get('/import', todos.import);
};

