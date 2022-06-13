const colors = require('colors');
const Lead = require('../models/Lead');
// @desc    Get all leads
// @route   GET /leads
// @access  Public *We Need to make it private*
exports.getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find();
    res.status(200).render('viewLeads', { leads, title: 'Leads' });
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    Get ONE leads
// @route   GET /leads/:id
// @access  Public *We Need to make it private*
exports.getNewLead = (req, res, next) => {
  res.render('newLead', { title: 'NEW LEAD PAGE' });
};
// @desc    Get ONE leads
// @route   GET /leads/:id
// @access  Public *We Need to make it private*
exports.getOneLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id });
    res.status(200).render('viewOneLead', { lead, title: 'One Lead' });
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    Create a new lead
// @route   POST /leads *might wanna make it route '/'*
// @access  Public
exports.createLead = async (req, res, next) => {
  console.log(req.body);
  try {
    const lead = await Lead.create(req.body);
    res.status(201).redirect('/leads'); // temp redirect to lead, should prob redirect to homepage or back to form page
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    Update a lead
// @route   PUT /leads/:id
// @access  Public
exports.updateLead = async (req, res, next) => {
  console.log('FUCK');
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { contacted: req.body.contacted === 'true' ? false : true },
      {
        new: true,
      }
    );
    console.log(lead);
    res.status(200).render('viewOneLead', { lead, title: 'One Lead' });
    if (!lead) {
      console.log(`${err}`.red);
      res.status(400).json({ success: false, err: err.message });
    }
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    Delete a lead
// @route   DELETE /leads/:id
// @access  Public
exports.deleteLead = async (req, res, next) => {
  console.log('DELETED'.red.bold.underline);
  console.log(req.params.id);
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    res.status(200).redirect('/leads');
    console.log(`${lead._id} succesfully deleted`);
    if (!lead) {
      console.log(`${err}`.red);
      res.status(400).json({ success: false, err: err.message });
    }
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
