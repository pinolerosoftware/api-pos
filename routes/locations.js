const express = require('express');
const router = express.Router();
const LocationsController = require('../controllers/locations');
const auth = require('../middlewares/auth')

/* GET users listing. */
router.get('/', auth, LocationsController.getLocations);

router.get('/:locationId', auth, LocationsController.getLocation);

router.put('/:locationId', auth, LocationsController.updateLocation);

router.delete('/:locationId', auth, LocationsController.deleteLocation);

router.post('/', auth, LocationsController.insertLocation);

module.exports = router;
