const express = require('express');
const router = express.Router();
const taskModel = require('./model');

// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const { task_description, task_notes, task_completed, project_id } = req.body;

    // Map the boolean value to the corresponding integer value (0 or 1)
    const completed = task_completed === true || task_completed === '1' ? 1 : 0;

    const newTask = await taskModel.addTask({ 
      task_description, 
      task_notes, 
      task_completed: completed, 
      project_id 
    });

    res.status(201).json(newTask); // Return the newly created task
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Error adding task' });
  }
});

// GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await taskModel.getTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ message: 'Error getting tasks' });
  }
});

module.exports = router;
