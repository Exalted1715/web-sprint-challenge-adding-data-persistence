const knex = require('../../data/dbConfig.js');

// Function to add a new task
async function addTask(task) {
  return knex('tasks').insert(task);
}

// Function to retrieve all tasks
async function getTasks() {
  const tasks = await knex('tasks')
    .join('projects', 'tasks.project_id', 'projects.project_id')
    .select(
      'tasks.task_id',
      'tasks.task_description',
      'tasks.task_notes',
      knex.raw('CAST(tasks.task_completed AS BOOLEAN) AS task_completed'), // Convert to boolean
      'projects.project_name',
      'projects.project_description'
    );

  return tasks.map(task => ({
    ...task,
    task_completed: Boolean(task.task_completed) // Convert to boolean
  }));
}

module.exports = {
  addTask,
  getTasks
};
