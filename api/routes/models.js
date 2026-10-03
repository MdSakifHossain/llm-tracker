import express from "express";
import { ObjectId } from "mongodb";
import { modelsCollection } from "../db.js";
import { validateModel } from "../validators/modelsValidator.js";

const router = express.Router();

// GET all models
router.get("/", async (req, res) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = 50;

        const [models, total] = await Promise.all([
            modelsCollection.find().sort({ updatedAt: -1 }).toArray(),

            modelsCollection.countDocuments(),
        ]);

        res.json({
            models,
            pagination: {
                currentPage: page,
                perPageLimit: limit,
                totalItems: total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single model by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid model ID format" });
        }

        const model = await modelsCollection.findOne({ _id: new ObjectId(id) });

        if (!model) {
            return res.status(404).json({ message: "Model not found" });
        }

        return res.json({ data: model });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create model
router.post("/", async (req, res) => {
    try {
        const secret = req.body?.secret;
        if (!secret || secret !== process.env.ADMIN_SECRET) {
            return res.status(401).json({ message: "Invalid Secret" });
        }

        const validation = validateModel(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validation.errors,
            });
        }

        const existingModel = await modelsCollection.findOne({
            model_name: validation.data.model_name,
        });

        if (existingModel) {
            return res.status(409).json({
                message: `A model with the name "${validation.data.model_name}" already exists.`,
            });
        }

        // Set matching timestamps on creation
        const now = new Date();
        const documentToInsert = {
            ...validation.data,
            createdAt: now,
            updatedAt: now,
        };

        const result = await modelsCollection.insertOne(documentToInsert);

        return res.status(201).json({
            message: "Model created successfully",
            insertedId: result.insertedId,
            data: documentToInsert,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update model by ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid model ID format" });
        }

        const secret = req.body?.secret;
        if (!secret || secret !== process.env.ADMIN_SECRET) {
            return res.status(401).json({ message: "Invalid Secret" });
        }

        const validation = validateModel(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validation.errors,
            });
        }

        const existingModel = await modelsCollection.findOne({
            model_name: validation.data.model_name,
            _id: { $ne: new ObjectId(id) },
        });

        if (existingModel) {
            return res.status(409).json({
                message: `Another model with the name "${validation.data.model_name}" already exists.`,
            });
        }

        // Exclude createdAt so original timestamp is untouched
        const { createdAt, ...updateFields } = validation.data;

        // Set updatedAt timestamp
        const updateData = {
            ...updateFields,
            updatedAt: new Date(),
        };

        const result = await modelsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Model not found" });
        }

        return res.json({
            message: "Model updated successfully",
            data: updateData,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
