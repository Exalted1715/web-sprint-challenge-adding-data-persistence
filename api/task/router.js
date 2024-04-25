const express = require('express');
const router = express.Router();
const taskModel = require('./model');

// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const { task_description, task_notes, task_completed, project_id } = req.body;

    // Map the boolean value to the corresponding integer value (0 or 1)
    const completed = task_completed === true || task_completed === '1' ? 1 : 0;

    // Check if task_notes is empty and set it to null if it is
    const notes = task_notes ? task_notes : null;

    const newTaskData = { 
      task_completed: completed, 
      task_description, 
      task_notes: notes, // Set task_notes to null if it's empty
      project_id 
    };

    const [taskId] = await taskModel.addTask(newTaskData);
    
    const newTask = { task_id: taskId, ...newTaskData }; // Combine task_id with other data

    // Convert task_completed to a boolean before sending the response
    newTask.task_completed = !!newTask.task_completed;

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
