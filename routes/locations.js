const express = require('express');
const router = express.Router();
const LocationsController = require('../controllers/locations')

/* GET users listing. */
router.get('/', LocationsController.getLocations);

router.get('/:locationId', LocationsController.getLocation);

router.put('/:locationId', LocationsController.updateLocation);

router.delete('/:locationId', LocationsController.deleteLocation);

router.post('/', LocationsController.insertLocation);

module.exports = router;
