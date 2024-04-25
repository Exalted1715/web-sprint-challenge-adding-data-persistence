const knex = require('../../data/dbConfig.js');

// Function to add a new task
async function addTask(task) {
  return knex('tasks').insert(task);
}

// Function to retrieve all tasks
async function getTasks() {
  return knex('tasks')
    .join('projects', 'tasks.project_id', 'projects.project_id')
    .select(
      'tasks.task_id',
      'tasks.task_description',
      'tasks.task_notes',
      'tasks.task_completed',
      'projects.project_name',
      'projects.project_description'
    );
}

module.exports = {
  addTask,
  getTasks
};
