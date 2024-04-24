exports.up = function(knex) {
    // Projects Table
    return knex.schema.createTable('projects', function(table) {
      table.increments('project_id').primary();
      table.string('project_name').notNullable();
      table.text('project_description');
      table.integer('project_completed').defaultTo(0);
    })
    // Resources Table
    .createTable('resources', function(table) {
      table.increments('resource_id').primary();
      table.string('resource_name').notNullable().unique();
      table.text('resource_description');
    })
    // Tasks Table
    .createTable('tasks', function(table) {
      table.increments('task_id').primary();
      table.text('task_description').notNullable();
      table.text('task_notes');
      table.integer('task_completed').defaultTo(0);
      table.integer('project_id').unsigned().notNullable();
      table.foreign('project_id').references('project_id').inTable('projects');
    })
    // Project_Resources Table
    .createTable('project_resources', function(table) {
      table.increments('project_resource_id').primary();
      table.integer('project_id').unsigned().notNullable();
      table.integer('resource_id').unsigned().notNullable();
      table.foreign('project_id').references('project_id').inTable('projects');
      table.foreign('resource_id').references('resource_id').inTable('resources');
    });
  };
  
  exports.down = function(knex) {
    // Drop all tables if they exist
    return knex.schema
      .dropTableIfExists('project_resources')
      .dropTableIfExists('tasks')
      .dropTableIfExists('resources')
      .dropTableIfExists('projects');
  };
  