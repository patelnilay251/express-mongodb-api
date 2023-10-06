const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const costShareSchema = new Schema({
    deductible: Number,
    _org: String,
    copay: Number,
    objectId: String,
    objectType: String
});


const linkedServiceSchema = new Schema({
    _org: String,
    objectId: String,
    objectType: String,
    name: String
});

// Define the linked plan service schema
const linkedPlanServiceSchema = new Schema({
    linkedService: linkedServiceSchema,
    planserviceCostShares: costShareSchema,
    _org: String,
    objectId: String,
    objectType: String
});


const planSchema = new Schema({
    planCostShares: costShareSchema,
    linkedPlanServices: [linkedPlanServiceSchema],
    _org: String,
    objectId: String,
    objectType: String,
    planType: String,
    creationDate: Date
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
