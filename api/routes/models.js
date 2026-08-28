import express from "express";
import { modelsCollection } from "../db.js";
import { validateModel } from "../validators/modelsValidator.js";

const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const models = await modelsCollection
//       .find()
//       .sort({ createdAt: -1 })
//       .toArray();

//     res.json(models);
//   } catch (err) {
//     res.status(500).json({
//       error: err.message,
//     });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = 50;
    const skip = (page - 1) * limit;

    const [models, total] = await Promise.all([
      modelsCollection
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .project({
          summary: 0,
        })
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
    const model = validateModel(req, res);
    const resp = await modelsCollection.insertOne(model);
    res.status(201).json({ ...model, _id: resp.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
