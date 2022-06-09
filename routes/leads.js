const express = require('express');
const router = express.Router();

const { getLeads } = require('../controllers/leads');
router.route('/').get(getLeads);
module.exports = router;
