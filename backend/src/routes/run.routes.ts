import express from "express";
import { prisma } from "../services/database.service";
import { generateUploadUrl, downloadFromS3 } from "../services/s3.service";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// POST /api/runs/upload - Get pre-signed URL for upload
router.post("/upload", async (req, res) => {
  try {
    const { userId, metadata } = req.body;

    const runId = uuidv4();
    const s3Key = `raw-data/${userId}/${runId}.json`;

    // Create run record
    const run = await prisma.run.create({
      data: {
        id: runId,
        userId,
        rawDataS3Key: s3Key,
        processingStatus: "uploaded",
        resort: metadata?.resort,
        runType: metadata?.runType,
      },
    });

    // Generate pre-signed URL (temporarily disabled - no AWS yet)
    // const uploadUrl = await generateUploadUrl(s3Key);
    const uploadUrl = "mock-s3-url-for-testing";

    res.json({
      runId: run.id,
      uploadUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to initiate upload" });
  }
});

// GET /api/runs/:runId - Get run details
router.get("/:runId", async (req, res) => {
  try {
    const { runId } = req.params;

    const run = await prisma.run.findUnique({
      where: { id: runId },
      include: { turnMetrics: true },
    });

    if (!run) {
      return res.status(404).json({ error: "Run not found" });
    }

    // If processing complete, fetch processed data from S3
    let processedData = null;
    if (run.processingStatus === "completed" && run.processedDataS3Key) {
      processedData = await downloadFromS3(
        process.env.S3_BUCKET_PROCESSED!,
        run.processedDataS3Key
      );
    }

    res.json({
      ...run,
      processedData,
    });
  } catch (error) {
    console.error("Get run error:", error);
    res.status(500).json({ error: "Failed to fetch run" });
  }
});

// GET /api/runs - List user's runs
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    const runs = await prisma.run.findMany({
      where: { userId: userId as string },
      orderBy: { uploadTime: "desc" },
      take: 50,
    });

    res.json(runs);
  } catch (error) {
    console.error("List runs error:", error);
    res.status(500).json({ error: "Failed to fetch runs" });
  }
});

export default router;
