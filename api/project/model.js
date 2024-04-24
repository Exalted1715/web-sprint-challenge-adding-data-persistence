

const knex = require('../../data/dbConfig.js');

function addProject(project) {
  return knex('projects').insert(project);
}

function getProjects() {
  return knex('projects');
}

module.exports = {
  addProject,
  getProjects
};
