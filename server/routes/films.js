import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// List of all film stocks
router.get("/all", async (req, res) => {
  try {
    const allFilms = await prisma.filmStock.findMany({
      include: { maker: true },
      orderBy: { id: "asc" },
    });
    res.json(allFilms);
  } catch (error) {
    console.error("Error fetching all film stocks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get single film stock
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    const filmStock = await prisma.filmStock.findUnique({ where: { id } });
    if (filmStock) {
      res.json(filmStock);
    } else {
      res.status(404).json({ error: "Film stock not found" });
    }
  } catch (error) {
    console.error("Error fetching film stock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
