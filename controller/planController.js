const { validate } = require('jsonschema');
const Plan = require('../models/Plan');

const planSchema = {
    "type": "object",
    "properties": {
        "planCostShares": {
            "type": "object",
            "properties": {
                "deductible": { "type": "number" },
                "_org": { "type": "string" },
                "copay": { "type": "number" },
                "objectId": { "type": "string" },
                "objectType": { "type": "string" }
            },
            "required": ["deductible", "_org", "copay", "objectId", "objectType"]
        },
        "linkedPlanServices": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "linkedService": {
                        "type": "object",
                        "properties": {
                            "_org": { "type": "string" },
                            "objectId": { "type": "string" },
                            "objectType": { "type": "string" },
                            "name": { "type": "string" }
                        },
                        "required": ["_org", "objectId", "objectType", "name"]
                    },
                    "planserviceCostShares": {
                        "type": "object",
                        "properties": {
                            "deductible": { "type": "number" },
                            "_org": { "type": "string" },
                            "copay": { "type": "number" },
                            "objectId": { "type": "string" },
                            "objectType": { "type": "string" }
                        },
                        "required": ["deductible", "_org", "copay", "objectId", "objectType"]
                    },
                    "_org": { "type": "string" },
                    "objectId": { "type": "string" },
                    "objectType": { "type": "string" }
                },
                "required": ["linkedService", "planserviceCostShares", "_org", "objectId", "objectType"]
            }
        },
        "_org": { "type": "string" },
        "objectId": { "type": "string" },
        "objectType": { "type": "string" },
        "planType": { "type": "string" },
        "creationDate": { "type": "string", "format": "date" }
    },
    "required": ["planCostShares", "linkedPlanServices", "_org", "objectId", "objectType", "planType", "creationDate"]


};

const validatePlan = (req, res, next) => {
    const validationResult = validate(req.body, planSchema);
    if (!validationResult.valid) {
        return res.status(400).json({ error: validationResult.errors });
    }
    next();
};

const addPlan = async (req, res) => {
    try {
        const plan = new Plan(req.body);
        await plan.save();
        res.status(201).json(plan);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getPlans = async (req, res) => {
    try {
        const query = {};

        if (req.query.planType) {
            query.planType = req.query.planType;
        }

        if (req.query.creationDate) {
            query.creationDate = new Date(req.query.creationDate);
        }

        if (req.query.deductible) {
            query["planCostShares.deductible"] = Number(req.query.deductible);
        }

        if (req.query.copay) {
            query["planCostShares.copay"] = Number(req.query.copay);
        }

        if (req.query.linkedServiceOrg) {
            query["linkedPlanServices._org"] = req.query.linkedServiceOrg;
        }

        if (req.query.linkedServiceName) {
            query["linkedPlanServices.linkedService.name"] = req.query.linkedServiceName;
        }

        const plans = await Plan.find(query);

        if (plans.length === 0) {
            return res.status(404).json({ error: 'No plans found matching the criteria' });
        }

        res.json(plans);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


const deletePlan = async (req, res) => {
    try {
        const plan = await Plan.findByIdAndDelete(req.query.id);

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        res.json({ message: 'Plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    validatePlan,
    addPlan,
    getPlans,
    deletePlan
};
