import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Get all film stocks of a certain type (ex. Black and White negative)
router.get("/:type", async (req, res) => {
  let { type } = req.params;
  type = type.replace(/-/g, " ");
  const format = await prisma.filmStock.findMany({
    where: { type: { equals: type, mode: "insensitive" } },
  });
  res.json(format);
});

export default router;
