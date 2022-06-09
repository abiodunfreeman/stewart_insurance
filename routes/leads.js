const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {
  getLeads,
  createLead,
  getOneLead,
  getNewLead,
} = require('../controllers/leads');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.route('/').get(getLeads).post(urlencodedParser, createLead);

router.route('/new').get(getNewLead);

router.route('/:id').get(getOneLead);

module.exports = router;
