const express = require('express');
const router = express.Router();
const SettingController = require('../../controllers/company/setting');
const auth = require('../../middlewares/auth');

router.put('/:settingId', auth, SettingController.updateSetting);

router.get('/:companyId', auth, SettingController.getSetting);

module.exports = router;