// resource/router.js

const express = require('express');
const router = express.Router();
const resourceModel = require('./model');

// POST /api/resources
router.post('/', async (req, res) => {
  try {
    const { resource_name, resource_description } = req.body;

    // Create a new resource
    const newResource = await resourceModel.addResource({ 
      resource_name, 
      resource_description
    });

    // Log the new resource to see what is being returned
    console.log('New resource:', newResource);

    // Return the newly created resource as response
    res.status(201).json(newResource);
  } catch (error) {
    console.error('Error adding resource:', error);
    res.status(500).json({ message: 'Error adding resource' });
  }
});

// GET /api/resources
router.get('/', async (req, res) => {
  try {
    // Get all resources from the database
    const resources = await resourceModel.getResources();

    // Return the resources as response
    res.json(resources);
  } catch (error) {
    console.error('Error getting resources:', error);
    res.status(500).json({ message: 'Error getting resources' });
  }
});

module.exports = router;
