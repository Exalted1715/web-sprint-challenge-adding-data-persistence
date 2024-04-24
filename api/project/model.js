// project/model.js

const knex = require('../../data/dbConfig.js');

async function addProject(project) {
  // Insert the project into the database
  const [projectId] = await knex('projects').insert(project);

  // Log the ID of the newly inserted project for debugging
  console.log('Newly inserted project ID:', projectId);

  // Retrieve the newly inserted project from the database
  const newProject = await knex('projects').where({ id: projectId }).first();

  // Log the newly retrieved project for debugging
  console.log('Newly retrieved project:', newProject);

  return newProject;
}



function getProjects() {
  return knex('projects');
}

module.exports = {
  addProject,
  getProjects
};
