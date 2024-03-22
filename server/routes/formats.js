import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Get all film stocks that include a specific format (ex. 35mm)
router.get("/:format", async (req, res) => {
  let { format } = req.params;
  console.log(format);
  format = format.replace(/-/g, " ");
  const formats = await prisma.filmStock.findMany({
    where: { formats: { has: format } },
  });
  res.json(formats);
});

export default router;
