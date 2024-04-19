import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// List of all film stocks
router.get("/all", async (req, res) => {
  const allFilms = await prisma.filmStock.findMany({
    include: { maker: true },
    orderBy: { id: "asc" },
  });
  res.json(allFilms);
});

// Get single film stock
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const filmStock = await prisma.filmStock.findUnique({ where: { id } });
  res.json(filmStock);
});

export default router;
