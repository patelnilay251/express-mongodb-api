const express = require('express');
const router = express.Router();
const { validatePlan, addPlan, getPlans, deletePlan } = require('../controller/planController');  // Import the delete function

router.post('/', validatePlan, addPlan);

router.get('/', getPlans);

router.delete('/', deletePlan);

module.exports = {
    dataRouter: router
};
