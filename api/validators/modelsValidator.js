export function validateModel(req, res) {
  const {
    name,
    url,
    totalParams,
    activeParams,
    contextWindow,
    ranOnWeb,
    ranThroughAgent,
    isMoE,
    isThinking,
    summary,
    secret,
  } = req.body;

  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ error: "name is required and must be a string" });
  }
  if (!url || typeof url !== "string") {
    return res
      .status(400)
      .json({ error: "url is required and must be a string" });
  }
  if (
    typeof totalParams !== "number" ||
    totalParams <= 0 ||
    !Number.isInteger(totalParams)
  ) {
    return res.status(400).json({
      error: "totalParams is required and must be a positive integer",
    });
  }
  if (
    typeof activeParams !== "number" ||
    activeParams <= 0 ||
    !Number.isInteger(activeParams)
  ) {
    return res.status(400).json({
      error: "activeParams is required and must be a positive integer",
    });
  }
  if (
    typeof contextWindow !== "number" ||
    contextWindow <= 0 ||
    !Number.isInteger(contextWindow)
  ) {
    return res.status(400).json({
      error: "contextWindow is required and must be a positive integer",
    });
  }
  if (typeof ranOnWeb !== "boolean") {
    return res
      .status(400)
      .json({ error: "ranOnWeb is required and must be a boolean" });
  }
  if (typeof ranThroughAgent !== "boolean") {
    return res
      .status(400)
      .json({ error: "ranThroughAgent is required and must be a boolean" });
  }
  if (typeof isMoE !== "boolean") {
    return res
      .status(400)
      .json({ error: "isMoE is required and must be a boolean" });
  }
  if (typeof isThinking !== "boolean") {
    return res
      .status(400)
      .json({ error: "isThinking is required and must be a boolean" });
  }
  if (!summary || typeof summary !== "string") {
    return res
      .status(400)
      .json({ error: "summary is required and must be a string" });
  }

  return {
    name,
    url,
    totalParams,
    activeParams,
    contextWindow,
    ranOnWeb,
    ranThroughAgent,
    isMoE,
    isThinking,
    summary,
    createdAt: new Date(),
  };
}
