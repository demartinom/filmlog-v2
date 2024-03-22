import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// List of all film stocks
router.get("/all", async (req, res) => {
  const allFilms = await prisma.filmStock.findMany();
  res.json(allFilms);
});

export default router;
