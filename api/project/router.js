// project/router.js

const express = require('express');
const router = express.Router();
const projectModel = require('./model');

// POST /api/projects
router.post('/', async (req, res) => {
  try {
    
    const { project_name, project_description, project_completed } = req.body;

    // Map the boolean value to the corresponding integer value (0 or 1)
  

    const newProject = await projectModel.addProject({ 
      project_name, 
      project_description, 
      project_completed, // Assign the integer value
    });

 

    res.status(201).json(newProject); // Return the newly created project
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ message: 'Error adding project' });
  }
});



// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await projectModel.getProjects();

    // Map project_completed field to boolean values
    const projectsWithBooleanCompleted = projects.map(project => ({
      ...project,
      project_completed: !!project.project_completed // Convert integer to boolean
    }));

    res.json(projectsWithBooleanCompleted);
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ message: 'Error getting projects' });
  }
});

module.exports = router;
