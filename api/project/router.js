// project/router.js

const express = require('express');
const router = express.Router();
const projectModel = require('./model');

// Middleware function
function customMiddleware(req, res, next) {
  // Your middleware logic here
  next(); // Call next to pass control to the next middleware or route handler
}

// Route handler for GET /api/projects
router.get('/', customMiddleware, async (req, res) => {
  try {
    const projects = await projectModel.getProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ message: 'Error getting projects' });
  }
});

// Route handler for POST /api/projects
router.post('/', customMiddleware, async (req, res) => {
  try {
    const { project_name, project_description, project_completed } = req.body;
    const newProject = await projectModel.addProject({ project_name, project_description, project_completed });
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ message: 'Error adding project' });
  }
});

module.exports = router;
