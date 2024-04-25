
const knex = require('../../data/dbConfig.js');

function addResource(resource) {
  return knex('resources').insert(resource).returning('resource_name');
}

function getResourceById(resourceId) {
  return knex('resources').where('resource_id', resourceId).first();
}

function getResources() {
  return knex('resources');
}

module.exports = {
  addResource,
  getResourceById,
  getResources
};
