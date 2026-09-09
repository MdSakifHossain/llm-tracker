import express from "express";
import { modelsCollection } from "../db.js";
import { validateModel } from "../validators/modelsValidator.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = 50;
        const skip = (page - 1) * limit;

        const [models, total] = await Promise.all([
            modelsCollection
                .find()
                .sort({ createdAt: -1 })
                // .skip(skip)
                // .limit(limit)
                // .project({
                //     summary: 0,
                // })
                .toArray(),

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
        res.status(500).json({
            error: err.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        // 1. Check secret before validation
        const secret = req.body?.secret;
        if (!secret || secret !== process.env.ADMIN_SECRET) {
            return res.status(401).json({ message: "Invalid Secret" });
        }

        // 2. Validate and sanitize input payload
        const validation = validateModel(req.body);

        if (!validation.isValid) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validation.errors,
            });
        }

        // 3. Check if model_name already exists in database
        const existingModel = await modelsCollection.findOne({
            model_name: validation.data.model_name,
        });

        if (existingModel) {
            return res.status(409).json({
                message: `A model with the name "${validation.data.model_name}" already exists.`,
            });
        }

        // 4. Insert sanitized document into MongoDB
        const result = await modelsCollection.insertOne(validation.data);

        // 5. Return success response
        return res.status(201).json({
            message: "Model created successfully",
            insertedId: result.insertedId,
            data: validation.data,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
