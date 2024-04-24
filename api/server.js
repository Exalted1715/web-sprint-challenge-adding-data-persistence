// server.js

const express = require('express');
const projectRouter = require('./project/router'); // Import project router
const resourceRouter = require('./resource/router'); // Import resource router
const taskRouter = require('./task/router'); // Import task router

const server = express();
server.use(express.json());

// Use routers
server.use('/api/projects', projectRouter);
server.use('/api/resources', resourceRouter);
server.use('/api/tasks', taskRouter);

module.exports = server;
