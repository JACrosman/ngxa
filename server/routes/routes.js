var ProjectController = require('./project');

function routes(app) {
    app.use('/api/project', ProjectController);
}

module.exports = routes;
