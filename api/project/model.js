// project/model.js

const knex = require('../../data/dbConfig.js');

async function addProject(project) {
  try {
    // Insert the project into the database
    const [projectId] = await knex('projects').insert(project);

    // Log the ID of the newly inserted project for debugging
    console.log('Newly inserted project ID:', projectId);

    // Retrieve the newly inserted project from the database using the correct primary key column name
    const newProject = await knex('projects').where({ project_id: projectId }).first();

    // Log the newly retrieved project for debugging
    console.log('Newly retrieved project:', newProject);

    return newProject;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error; // Re-throw the error to handle it in the caller function
  }
}


function getProjects() {
  return knex('projects');
}

module.exports = {
  addProject,
  getProjects
};
