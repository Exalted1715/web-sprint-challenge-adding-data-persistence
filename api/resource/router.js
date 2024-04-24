// resource/router.js

const express = require('express');
const router = express.Router();
const resourceModel = require('./model');

// POST /api/resources
router.post('/', async (req, res) => {
  try {
    const { resource_name, resource_description } = req.body;
    
    // Add the new resource to the database
    const newResourceId = await resourceModel.addResource({ resource_name, resource_description });

    // Fetch the inserted resource from the database using its ID
    const insertedResource = await resourceModel.getResourceById(newResourceId);

    // Respond with the newly created resource
    res.status(201).json(insertedResource);
  } catch (error) {
    console.error('Error adding resource:', error);
    res.status(500).json({ message: 'Error adding resource' });
  }
});

// GET /api/resources
router.get('/', async (req, res) => {
  try {
    const resources = await resourceModel.getResources();
    res.json(resources);
  } catch (error) {
    console.error('Error getting resources:', error);
    res.status(500).json({ message: 'Error getting resources' });
  }
});

module.exports = router;
