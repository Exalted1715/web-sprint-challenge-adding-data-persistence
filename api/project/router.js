// build your `/api/projects` router here
const projectRouter = require('express').Router();

// Middleware function to log a message
function loggerMiddleware(req, res, next) {
    console.log('Middleware executed!');
    next(); // Call next to pass control to the next middleware or route handler
}

projectRouter.use(loggerMiddleware); // Use the loggerMiddleware for all routes

// Route to handle all requests
projectRouter.use('*', (req, res) => {
    res.status(500).json({
        api: 'up and running'
    });
});

// Error handling middleware
projectRouter.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: "Something went wrong inside the project projectRouter",
        message: err.message,
        stack: err.stack,
    });
});

module.exports = projectRouter;
