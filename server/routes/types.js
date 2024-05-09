import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Get all film stocks of a certain type (ex. Black and White negative)
router.get("/:type", async (req, res) => {
  try {
    let { type } = req.params;
    type = type.replace(/-/g, " ");
    const format = await prisma.filmStock.findMany({
      where: { type: { equals: type, mode: "insensitive" } },
    });
    res.json(format);
  } catch (error) {
    console.error("Error fetching film stocks by type:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
